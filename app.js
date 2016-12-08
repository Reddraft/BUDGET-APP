

//======= BUDGET CONTROLLER ==============

var budgetController = (function() {

  // Some Code

})();


//======= UI CONTROLLER ==============

var UIController = (function() {

  // DOM Elements
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  // return UIController Object
  return {
      // getInput() returns an object with type.value description.value value.value as properties
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value,// get value="income" or value="expense" from html
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).valueAsNumber
        };
      },
      getDOMstrings: function() {
        return DOMstrings;
      }

  }

})();


//======= APP CONTROLLER ==============

var controller = (function(budgetCtrl, UICtrl) {

  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {

    // 1. get the field input  data
    var input = UICtrl.getInput();
    // 2. add item to the budget controller

    // 3. add the item to the user interface

    // 4. calculate the budget

    // 5. Display the budget in the UI

  };

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


  document.addEventListener('keypress', function(event) {

    if (event.keyCode === 13 || event.which === 13) {

        ctrlAddItem();

    }

  });


})(budgetController, UIController);
