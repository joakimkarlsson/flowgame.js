describe("Task", function() {
  var task;

  beforeEach(function() {
    task = FlowGame.createTask();
  });

  it("is initially not completed", function() {
    expect(task.isCompleted()).toBeFalsy();
  });
});
