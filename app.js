
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
    },
    budget: 0,
    percentage: -1
  };

  // CALCULATE TOTAL FUNCTION
  var calculateTotal = function(type) {
    //initialize sum with 0
    var sum = 0;
    //depending on the type loop through all items in the array then sum all its values
    data.allItems[type].forEach(function(item) {
      sum += item.value;
    });
    // set the total of the sum of all items value in the array
    data.totals[type] = sum;
  };


  //---RETURN BUDGETCONTROLLER OBJECT
  return {

    //---addInput() returns an object that can be access by budgetController.addItem()
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

      //create new item based on 'inc' or 'exp'
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      //push item into data structure
      data.allItems[type].push(newItem);
      // return new item
      return newItem;
    },

    //---calculateBudget() calculate based on icomes and expnses what's tha final budget
    calculateBudget: function() {
      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      //calculte the percentage of income that was spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100 );
      } else {
        data.percentage = -1;
      }

    },
    //---getBudget() returns an object with ev
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  //---RETURN UICONTROLLER OBJECT
  return {

      //---getInput() returns an object with type.value description.value value.value as properties
      getInput: function() {
        return {
          type: document.querySelector(domStrings.inputType).value,// get value="inc" or value="exp" from html
          description: document.querySelector(domStrings.inputDescription).value,
          value: parseFloat(document.querySelector(domStrings.inputValue).value)
        };
      },

      //---addListItem() creates an HTML string of an item based on its type then add it into the DOM
      addListItem: function(obj, type, element) {

        var html, newHtml;
        //check if its an exp or inc then create HTML string with placeholder text
        if (type === 'inc') {
          //select the income list
          element = domStrings.incomeContainer;
          //income html
          html =
          '<div class="item clearfix" id="income-%id%">' +
            '<div class="item__description">%description%</div>' +
            '<div class="right clearfix">' +
              '<div class="item__value">%value%</div>' +
              '<div class="item__delete">' +
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
              '</div>' +
            '</div>' +
          '</div>';
        } else if (type === 'exp') {
          //select the income list
          element = domStrings.expensesContainer;
          //Expense html
          html =
          '<div class="item clearfix" id="expense-%id%">' +
            '<div class="item__description">%description%</div>' +
            '<div class="right clearfix">' +
                '<div class="item__value">%value%</div>' +
                '<div class="item__percentage">21%</div>' +
                '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div>' +
            '</div>' +
          '</div>';
        }

        //Replace the placeholder text with actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        //Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

      },

      //---clearFields() clear the inputs in the form
      clearFields: function() {
        var fields, fieldsArr;
        //select description and value fields
        fields = document.querySelectorAll(domStrings.inputDescription + ', '+  domStrings.inputValue);
        // convert it in an actual array
        fieldsArr = Array.prototype.slice.call(fields);
        //loop throug the array and ampty each field
        fieldsArr.forEach(function(field) {
            field.value = "";
        });
        //Make the first input selected
        fieldsArr[0].focus();
      },

      //---getDOMstrings() returns the DOMstrings object variable
      getDOMstrings: function() {
        return domStrings;
      }

  }

})();


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
    console.log(budget);
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
      uiController.addListItem(newItem, input.type);
      //4 clear the input fields
      uiController.clearFields();
      //5 Calculate and update the budget
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
