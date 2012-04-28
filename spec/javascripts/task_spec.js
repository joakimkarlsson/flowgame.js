describe("Task", function() {
  var task;

  beforeEach(function() {
    task = FlowGame.createTask();
  });

  it("is initially not completed", function() {
    expect(task.isCompleted()).toBeFalsy();
  });

  it("is marked completed when a person has done all work left on it", function() {
    task = FlowGame.workOnTask(task, work
  });
});
