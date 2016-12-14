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

    //---deleteItem()
    deleteItem: function(type, id) {
      var ids, index;

      // ids = [1, 3, 5, 8, 9]
      // loop through inc or exp array and return the ids of the items then store them in the ids array
      ids = data.allItems[type].map(function(item) {
          return item.id;
      });
      // ids = [1, 3, 5, 8, 9]
      // index = ids.indexOf(8); --> return 3
      //index = 3
      // check whats the index of the id passed as parameter if its found then store it in a variable
      index = ids.indexOf(id);

      //if index exists deleted from array
      if (index !== -1) {
        //example above remove index 3 from either inc or exp array
        data.allItems[type].splice(index, 1);
      }

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
      };
    },
    //---Test data on the console
    testing: function() {
      console.log(data);
    }

  };

})();
