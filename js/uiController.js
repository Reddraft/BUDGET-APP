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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
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
      addListItem: function(obj, type) {
        var html, newHtml, element;

        //check if its an exp or inc then create HTML string with placeholder text
        if (type === 'inc') {
          //select the income list
          element = domStrings.incomeContainer;
          //income html
          html =
          '<div class="item clearfix" id="inc-%id%">' +
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
          '<div class="item clearfix" id="exp-%id%">' +
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

      //---deleteItem() remove de element from the UI
      deleteListItem: function(selectorID) {

        //selects the item in the list by the ID
        var el = document.getElementById(selectorID)
        //select the parent element then remove the parent child (The element)
        el.parentNode.removeChild(el);

      },

      //---clearFields() clear the inputs in the form
      clearFields: function() {
        var fields, fieldsArr;

        //select description and value fields
        fields = document.querySelectorAll(domStrings.inputDescription + ', '+  domStrings.inputValue);

        // convert it in an actual array
        fieldsArr = Array.prototype.slice.call(fields);

        //loop through the array and ampty each field
        fieldsArr.forEach(function(field) {
            field.value = "";
        });

        //Make the first input selected
        fieldsArr[0].focus();

      },

      //---displayBudget()
      displayBudget: function(obj) {

        document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
        document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(domStrings.expenseLabel).textContent = obj.totalExp;

        if (obj.percentage > 0) {
          document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%';
        } else {
          document.querySelector(domStrings.percentageLabel).textContent = '---';
        }

      },


      displayPercentages: function(percentages) {
        var fields = document.querySelectorAll(domStrings.expensesPercLabel);

        var nodeListForEach = function(list, callback) {
          for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
          }
        };

        nodeListForEach(fields, function(item, index) {
          if (percentages[index] > 0) {
            item.textContent = percentages[index] + '%';
          } else {
            item.textContent = '---';
          }

        });

      },

      //---getDOMstrings() returns the DOMstrings object variable
      getDOMstrings: function() {
        return domStrings;
      }

  }

})();
