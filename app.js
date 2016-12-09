
/**********************************************
*** BUDGET CONTROLLER
**********************************************/

var budgetController = (function() {

  // EXPENSE FUNCTION CONSTRUCTOR
  var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  // INCOME FUNCTION CONSTRUCTOR
  var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  // RETRIEVE DATA STRUCTURE OBJECT
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  //---RETURN BUDGETCONTROLLER OBJECT
  return {

    //addInput() returns an object that can be access by budgetController.addItem()
    addItem: function(type, des, val) {

      var newItem, ID;

      //---Create new ID
      //check if there are items in the array
      // if exp or inc arrays are not empty add 1 to the id
      //exp: [] or inc: []
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        // if exp or inc arrays are empty initialize with id = 0
        //exp: [{id: 0}] or inc: [{id: 0}]
      } else {
        ID = 0;
      }

      //create new item basedon 'inc' or 'exp'
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      //push item into data structure
      data.allItems[type].push(newItem);
      // return new item
      return newItem;
    }

  };

})();


/**********************************************
*** UI CONTROLLER
**********************************************/

var uiController = (function() {

  // DOM ELEMENTS OBJECT VARIABLE
  var domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  //---RETURN UICONTROLLER OBJECT
  return {
      //getInput() returns an object with type.value description.value value.value as properties
      getInput: function() {
        return {
          type: document.querySelector(domStrings.inputType).value,// get value="inc" or value="exp" from html
          description: document.querySelector(domStrings.inputDescription).value,
          value: document.querySelector(domStrings.inputValue).valueAsNumber
        };
      },
      //getDOMstrings() returns the DOMstrings object variable
      getDOMstrings: function() {
        return domStrings;
      }

  }

})();


/**********************************************
*** APP CONTROLLER
**********************************************/

var controller = (function(budgetCtrl, UICtrl) {

  //----ADD ITEM FUNCTION
  var ctrlAddItem = function() {
    
    var input, newItem;
    // 1. get the field input data from the uiController
    input = UICtrl.getInput();
    // 2. add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. add the item to the user interface

    // 4. calculate the budget

    // 5. Display the budget in the UI

  };

  // ---- SETUP EVENT LISTENERS FUNCTION
  var setupEventListeners = function() {


    //call UICtrl.getDOMstrings() to access DOM elements from the uiController
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

  //--- RETURN CONTROLLER OBJECT
  return {
    init: function() {
        setupEventListeners();
    }
  }

})(budgetController, uiController);

/**********************************************
*** INITIALIZATION
**********************************************/
controller.init();
