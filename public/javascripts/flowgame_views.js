var FlowGame = FlowGame || {};
FlowGame.views = {};

FlowGame.views.createColumns = function(count) {
  for(var i = 0; i < count; i++) {
    $('#column-container').append(FlowGame.views.createColumn(i));
  }
};

FlowGame.views.createColumn = function(id) {
  return $('<div></div>')
    .addClass('column')
    .attr('id', 'column-' + id);
};

FlowGame.views.addCardToColumn = function(params) {
  $('#column-' + params.columnId).append(params.card);
};

FlowGame.views.createCard = function(card) {
  return $('<div></div>')
    .addClass('card')
    .attr('id', 'card-' + card.id)
    .append($('<div></div>')
        .addClass('cardTitle')
        .text(card.title))
    .append($('<progress></progress>')
        .addClass('cardProgress')
        .attr('value', 2)
        .attr('max', card.size));
};

FlowGame.views.moveCard = function(params) {
  var card = $('#card-' + params.cardId);

  card.remove();

  var column = $('#column-' + params.columnId);
  column.append(card);
};

$(document).ready(function() {
  FlowGame.views.createColumns(5);
  var card = FlowGame.views.createCard({id:0, title: 'First Card', size: 5});
  FlowGame.views.addCardToColumn({columnId: 0, card: card});

  $('#nextMenuItem').click(function() {
    FlowGame.views.moveCard({cardId: 0, columnId: 1});
  });
});

//    <div id="column-container">
//      <div id="column1" class="column">
//        <div class="card">
//          <div class="cardTitle">
//            Title
//          </div>
//            <progress class="cardProgress" value="50" max="100" />
//        </div>
//        <div class="card"> </div>
//      </div>
