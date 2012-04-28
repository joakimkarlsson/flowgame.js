describe("Task", function() {
  var task;

  beforeEach(function() {
    task = FlowGame.createTask();
  });

  it("is initially not completed", function() {
    expect(FlowGame.isTaskComplete(task)).toBeFalsy();
  });

  it("is marked completed when a person has done all work left on it", function() {
    var alwaysCompletes = function(task) {
      return task.size;
    };

    task = FlowGame.workOnTask(task, alwaysCompletes);

    expect(FlowGame.isTaskComplete(task)).toBeTruthy();
  });
});
