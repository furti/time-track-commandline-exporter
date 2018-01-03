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

function getMinMaxTime(tasks) {
  var min = null;
  var max = null;

  tasks.forEach(function(task) {
    if (task.times) {
      task.times.forEach(function(time) {
        if (!min || min > time.start) {
          min = time.start;
        }

        if (!max || max < time.end) {
          max = time.end;
        }
      });
    }
  });

  return {
    min: min,
    max: max
  };
}

module.exports = function(tasks) {
  var minMax = getMinMaxTime(tasks);

  console.log(chalk.green("Start: " + minMax.min));
  console.log(chalk.green("End: " + minMax.max));

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
