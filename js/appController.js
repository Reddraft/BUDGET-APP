
/**********************************************
*** APP CONTROLLER
**********************************************/

var controller = (function(budgetCtrl, UICtrl) {

  //---UPDATE BUDGET FUNCTION
  var updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();
    // 2. return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget in the UI
    UICtrl.displayBudget(budget);
  }

  //---ADD ITEM FUNCTION
  var ctrlAddItem = function() {

    var input, newItem;
    // 1. call UICtrl.getInput() to get the field input data from the uiController
    input = UICtrl.getInput();
    //if there's a description, the value is a number and the value is not 0. Execute the rest of the steps
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
     // 2. call budgetCtrl.additem() to add an item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. call uiController.addListItem() to add the item to the user interface
      UICtrl.addListItem(newItem, input.type);
      //4 clear the input fields
      UICtrl.clearFields();
      //5 Calculate and update the budget
      updateBudget();
    }

  };

  //---DELETE ITEM FUNCTION
  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    //capture the target element that was click inside container then traverse the DOM to get the 4th parent id
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    // check if the element that was clicked was the delete button icon
    if (event.target.className === "ion-ios-close-outline" ) {
      // if delete button icon was clicked then id before split ---> exp-1 || and after split ---> ['exp', '1']
      splitID = itemID.split('-');
      //type = exp
      type = splitID[0];
      //ID = 1
      ID = parseInt(splitID[1]);
      // 1. delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. delete item from the UI
      UICtrl.deleteListItem(itemID);
      // 3. update and show the new budget
      updateBudget();
    }
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

    //execute ctrlDeleteItem() when click on the Container element
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  //--- RETURN CONTROLLER OBJECT
  return {
    init: function() {
        console.log('Application is running');
        //call uiController.displayBudget
        UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1
        });
        //call setupEventListeners
        setupEventListeners();
    }
  }

})(budgetController, uiController);
