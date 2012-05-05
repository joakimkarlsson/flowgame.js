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

  it("is marked as completed even if a person happens to do more work than necessary", function() {
    var completesMoreWorkThanNecessary = function(task) {
      return task.size + 12;
    };

    task = FlowGame.workOnTask(task, completesMoreWorkThanNecessary);

    expect(FlowGame.isTaskComplete(task)).toBeTruthy();
    expect(task.progress).toEqual(task.size);
  });
});
