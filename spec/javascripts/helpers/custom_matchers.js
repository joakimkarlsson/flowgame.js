Object.prototype.toString = function() {
  var res = [];
  for(var prop in this) {
    if(this.hasOwnProperty(prop)) {
      res.push(prop + ": " + this[prop].toString());
    }
  };

  return "{ " + res.join(", ") + " }";
};

beforeEach(function() {
  var taskNotPresentIn = function(array) {
    return function(task) {
      return !array.some(function(t) {
        return t.id === task.id;
      });
    };
  };

  this.addMatchers({
    toHaveTasks: function(tasks) {
      var tasksInColumn = this.actual.tasks;

      var unexpectedTasksInColumn = tasksInColumn.filter(taskNotPresentIn(tasks));
      var missingTasksInColumn = tasks.filter(taskNotPresentIn(tasksInColumn));

      this.message = function() {
        return "Expected column to equal " + tasks+ ", actual is " + tasksInColumn;
      };

      return unexpectedTasksInColumn.length === 0 && missingTasksInColumn.length === 0;
    }
  });
});
