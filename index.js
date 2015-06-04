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
var chalk = require('chalk'),
  timeTrack = require('time-track');

module.exports = function(tasks) {
  tasks.forEach(function(task) {
    console.log(chalk.blue(task.description + ': ' + timeTrack.calculateDuration(task)));
  });
};
