/**
 * Copyright 2015 Daniel Furtlehner
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Exporter that simply outputs all tasks and their duration to the console.
 */
var chalk = require("chalk"),
  timeTrack = require("time-track");

const TIME_SLOT_MIN_PAUSE_MILLIS = 1000 * 60 * 10;

function getTimeSlots(tasks) {
  var allTimes = []

  tasks.forEach(function(task) {
    if (task.times) {
      task.times.forEach(function(time) {
        allTimes.push(time);
      });
    }
  });

  allTimes.sort((a, b) => {
    aDate = a.start;
    bDate = b.start;

    return aDate.getTime() - bDate.getTime();
  });

  const timeSlots = []
  let actualSlot = null;

  allTimes.forEach(entry => {
    if(actualSlot === null) {
      actualSlot = {
        start: entry.start,
        end: entry.end
      }
    }
    else {
      const lastEndTime = actualSlot.end.getTime();
      const nextStartTime = entry.start.getTime();
      const pauseInMillis = nextStartTime - lastEndTime;

      if(pauseInMillis >= TIME_SLOT_MIN_PAUSE_MILLIS) {
        // Start a new slot when the pause is too big
        actualSlot.pauseInMillis = pauseInMillis;
        timeSlots.push(actualSlot);

        actualSlot = {
          start: entry.start,
          end: entry.end
        }
      }
      else {
        // Otherwise update the end time of the actual slot
        actualSlot.end = entry.end
      }
    }
  });

  if(actualSlot !== null) {
    timeSlots.push(actualSlot);
  }

  return timeSlots;
}

module.exports = function(tasks) {
  var timeSlots = getTimeSlots(tasks);

  for(let timeSlot of timeSlots)
  {
    console.log(chalk.green("Start: " + timeSlot.start));
    console.log(chalk.green("End: " + timeSlot.end));

    if(timeSlot.pauseInMillis) {
      console.log(chalk.yellow("Pause: " + Math.round(timeSlot.pauseInMillis / 1000 / 60) + " min"));
    }
    
    console.log('');
  }

  tasks.forEach(function(task) {
    console.log(
      chalk.blue(
        task.id +
          ". " +
          task.description +
          ": " +
          timeTrack.calculateDuration(task)
      )
    );
  });
};
