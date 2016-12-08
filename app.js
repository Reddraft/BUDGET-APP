

//======= BUDGET CONTROLLER ==============

var budgetController = (function() {

  // Some Code

})();


//======= UI CONTROLLER ==============

var UIController = (function() {

  // Some Code

})();


//======= APP CONTROLLER ==============

var controller = (function(budgetCtrl, UICtrl) {

  var ctrlAddItem = function() {

    // 1. get the field input  data

    // 2. add item to the budget controller

    // 3. add the item to the user interface

    // 4. calculate the budget

    // 5. Display the budget in the UI
  
  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);


  document.addEventListener('keypress', function(event) {

    if (event.keyCode === 13 || event.which === 13) {

        ctrlAddItem();

    }

  });


})(budgetController, UIController);
