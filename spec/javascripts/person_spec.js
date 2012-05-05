describe("Person", function() {
  var person = {};

  beforeEach(function() {
    person = FlowGame.createPerson({capacity: 2});
  });

  it("should leave the task partially worked on, but not completed when task is larger than person's capacity", function() {
    var task = FlowGame.createTask({size: 5});
    var progress = FlowGame.calculateProgressOnTask(person)(task);
    expect(progress).toEqual(2);
  });

  it("should leave the task completed, when it's size is less than the person's capacity", function() {
    var task = FlowGame.createTask({size: 1});
    var progress = FlowGame.calculateProgressOnTask(person)(task);
    expect(progress).toEqual(1);
  });
});
