describe("Person", function() {
  var task = {};
  var person = {};

  beforeEach(function() {
    task = FlowGame.createTask({size: 5});
    person = FlowGame.createPerson({capacity: 2});
  });

  it("should leave the task partially worked on, but not completed", function() {
    var progress = FlowGame.calculateProgressOnTask(person)(task);
    expect(progress).toEqual(2);
  });
});
