/**
 * Exporter that simply outputs all tasks and their duration to the console.
 */
var chalk = require('chalk'),
  timeTrack = require('time-track');

module.exports = function(tasks) {
  tasks.forEach(function(task) {
    console.log(chalk.blue(task.name + ': ' + timeTrack.calculateDuration(task)));
  });
};
