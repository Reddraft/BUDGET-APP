
/**********************************************
*** BUDGET CONTROLLER
**********************************************/

var budgetController = (function() {

  // Some Code

})();



/**********************************************
*** UI CONTROLLER
**********************************************/

var UIController = (function() {

  // DOM ELEMENTS OBJECT VARIABLE
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  //---RETURN UICONTROLLER OBJECT
  return {
      //getInput() returns an object with type.value description.value value.value as properties
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value,// get value="income" or value="expense" from html
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).valueAsNumber
        };
      },
      //getDOMstrings() returns the DOMstrings object variable
      getDOMstrings: function() {
        return DOMstrings;
      }

  }

})();


/**********************************************
*** APP CONTROLLER
**********************************************/

var controller = (function(budgetCtrl, UICtrl) {

  // ---- SETUP EVENT LISTENERS FUNCTION
  var setupEventListeners = function() {

    //call UICtrl.getDOMstrings() to access DOM elements from the UIController
    var DOM = UICtrl.getDOMstrings();

    //execute ctrlAddItem() when click DOM.inputBtn
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    //execute ctrlAddItem() when click "Enter" Key
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
      }
    });
  };


  //----ADD ITEM FUNCTION
  var ctrlAddItem = function() {

    // 1. get the field input data from the UIController
    var input = UICtrl.getInput();
    // 2. add item to the budget controller

    // 3. add the item to the user interface

    // 4. calculate the budget

    // 5. Display the budget in the UI

  };

  //--- RETURN CONTROLLER OBJECT
  return {
    init: function() {
        setupEventListeners();
    }
  }

})(budgetController, UIController);

/**********************************************
*** INITIALIZATION
**********************************************/
controller.init();
