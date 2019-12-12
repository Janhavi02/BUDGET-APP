
// BUDGET CONTROLLER
var budgetController = (function(){

	var Expense = function(id , description ,value ){        // function constructor
		this.id = id,
		this.description = description,
		this.vallue = value
	};
	var Income = function(id , description ,value ){        // function constructor
		this.id = id,
		this.description = description,
		this.vallue = value
	};
	var data= {
		 allItems:{
			exp: [],
			inc: []
		},
		 totals :{
			exp:0,
			inc:0
		}
	}

	return{
		addItem: function(type , des , val){
			var newItem, ID ;

			//generate ID
			//ID = last+1
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
		

			//Add newItem to 'inc' or 'exp'
			if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}

			//push newItem to 'inc' or 'exp'
				data.allItems[type].push(newItem);
			//return newItem
				return newItem;
			},

		testing: function(){
			console.log(data);
		}
	}



})();


var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};

	return {
		getInput : function(){
			return {
				type : document.querySelector(DOMstrings.inputType).value, // inc or exp
			    description : document.querySelector(DOMstrings.inputDescription).value, // description
			    value : document.querySelector(DOMstrings.inputValue).value //value number
			};
		},

		addListItem :function(obj, type){
			var html, newHtml, element;

			// Create html string with placeholder tag
			if(type === 'inc'){
				element = DOMstrings.incomeContainer; 
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			} else if(type === 'exp'){
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			//Replace the placeholder text with actual data
			newHtml = html.replace('%id%',obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);


			//Insert html into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		getDOMstrings : function(){
			return DOMstrings;
		}
	};

})();

var controller = (function(budgetCtrl,UICtrl){

		var ctrlAddItem = function(){

		var input,newItem;

		//1 get the field input
		input = UICtrl.getInput();

		//2 add value to budgetcontroller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3 add value to UI
		UICtrl.addListItem(newItem, input.type);

		//4 calculate budget
		//5 update UI
	}

	var setupEventListener = function(){

		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)

		document.addEventListener('keypress', function(event) {
			if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});


};
		return {
			init: function(){
				console.log("application has started");
				setupEventListener();
			}
		};


})(budgetController,UIController);

controller.init();