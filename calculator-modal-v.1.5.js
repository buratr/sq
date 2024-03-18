// elements
const calcModal = document.querySelector(".modal-calculator");
const btnPlus = document.querySelectorAll("#calc-plus");
const btnMinus = document.querySelectorAll("#calc-minus");
const frontData = document.querySelectorAll('span'); // all span on page
const imageCheckbox = document.querySelectorAll('.dropdown-checkbox');
const imageCheckboxChildNodes = document.querySelectorAll('.checkbox-block');
const getStartedBtn = document.querySelector('.modal-calculator [btn="get_started"]');
//const formData = document.forms;
let formData = [];
formData[0] = document.querySelector("#wf-form-calculator");

//modal observer
{
	// selec observer element
	let target = calcModal;

	// create new constructor
	let observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		sendDataSummary();
	    //console.log(mutation.type); //for test return result
	  });
	});

	// create config to observe
	let config = { attributes: true, childList: true, characterData: true };

	// start observe
	observer.observe(target,  config);
}

// data object
let summaryData = [
	 {name: "clothing_flat_lay", index: 0, count: 0, state: false,
	 	price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	 },
	{name: "clothing_ghost", index: 1, count: 0, state: false,
		price: {plan_a: 75, plan_d: 67.5, plan_b: 60, plan_c: 52.5}
	},
	{name: "clothing_on_model", index: 2, count: 0, state: false,
		price: {plan_a: 150, plan_d: 142.5, plan_b: 135, plan_c: 127.5}
	},
	{name: "clothing_pinned", index: 3, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "beauty_catalog", index: 4, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "beauty_swatches", index: 5, count: 0, state: false,
		price: {plan_a: 75, plan_d: 67.5, plan_b: 60, plan_c: 52.5}
	},
	{name: "beauty_on_model", index: 6, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "shoes_catalog", index: 7, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "shoes_on_model", index: 8, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "bags_catalog", index: 9, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "bags_hanged", index: 10, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "bags_on_model", index: 11, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "jewelry_catalog", index: 12, count: 0, state: false,
		price: {plan_a: 100, plan_d: 90, plan_b: 80, plan_c: 70}
	},
	{name: "jewelry_on_model", index: 13, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "watches_catalog", index: 14, count: 0, state: false,
		price: {plan_a: 100, plan_d: 90, plan_b: 80, plan_c: 70}
	},
	{name: "watches_on_model", index: 15, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "accessories_catalog", index: 16, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "accessories_ghost", index: 17, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},
	{name: "accessories_on_model", index: 18, count: 0, state: false,
		price: {plan_a: 100, plan_d: 95, plan_b: 90, plan_c: 85}
	},
	{name: "home_catalog", index: 19, count: 0, state: false,
		price: {plan_a: 50, plan_d: 45, plan_b: 40, plan_c: 35}
	},

	 {planType: "pay_as_you_go", value: 1, dataName: "plan_a", price: 0, state: true, planInfo: "Free of charge"},
	 {planType: "growth", value: 2, dataName: "plan_b", price: 0, state: false,
		planInfo: {	activeDiscount: "$2,500/year",
					disableDiscount: "$1,750/6 months",
					activeDiscountMob: "$2,500/year",
					disableDiscountMob: "$1,750/6 months"
					},
		planPrice: {activeDiscount: 2500, disableDiscount: 1750}
	 },
	 {planType: "enterprise", value: 3, dataName: "plan_c", price: 0, state: false,
		planInfo: {	activeDiscount: "$7,500/year",
					disableDiscount: "$5,250/6 months",
					activeDiscountMob: "$7,500/year",
					disableDiscountMob: "$5,250/6 months"
		},
		planPrice: {activeDiscount: 7500, disableDiscount: 5250}
	 },
	{planType: "starter", value: 4, dataName: "plan_d", price: 0, state: false,
		planInfo: {	activeDiscount: "$500/year",
					disableDiscount: "$350/6 months",
					activeDiscountMob: "$500/year",
					disableDiscountMob: "$350/6 months"
		},
		planPrice: {activeDiscount: 500, disableDiscount: 350}
	},
	 {name: "discount", item: 20, state: false},
	 {dataName: "image_total_count", total: 0},
	 {dataName: "peice_per_image", total: 0},
	 {dataName: "image_total", total: 0, totalStandart: 0},
	 {dataName: 'plan_info', planPrice: 0, total: 'Free of charge', totalMob: 'Free of charge'},
	 {dataName: "total", total: 0},
	 {dataName: "save", total: 0},
]

// определяем что в данным момент используется мобильное устройство
function isMobileResolution() {
	const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (screenWidth < 767) {return true;} else {return false;}
}

//change count
const counterPlus = function(counterIndex) {
	counterIndex.count++
	calculator()
}

const counterMinus = function(counterIndex) {
	counterIndex.count > 0 ? counterIndex.count-- : counterIndex.count = 0;
	calculator()
}

const resetPrevState = function() {
	summaryData.forEach(item => {
		if (item.planType) {
			item.state = false
		}
	})
}

// checkbox checked
const imageChecked = function(counterIndex) {
	if (counterIndex.state != false) {
		counterIndex.count = 0;
		counterIndex.state = false;
	}
	else {
		counterIndex.count = 1;
		counterIndex.state = true;
	}
	sendDataInputs(counterIndex) // object {name & count}
}

const checkPlanSelected = function() {
	 return summaryData.find(el => {
		if (el.planType) {
			if (el.state === true) {
				return el.dataName
			}
		}
	})
}

const imagePriceSelected = function() {
	const plan = checkPlanSelected();
	let arr = [];
	summaryData.forEach(item => {
		if (item.price && item.state === true) {
			arr.push(item.price[plan.dataName])
		}
	})
	return arr
}
function formatNumber(number) {
	// Разделяем число на целую и дробную части
	const [integerPart, decimalPart] = number.toString().split('.');
	// Форматируем целую часть, добавляя разделители тысяч
	const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	// Если есть дробная часть, возвращаем число с точкой и отформатированной целой частью
	if (decimalPart) {
		return `${formattedIntegerPart}.${decimalPart}`;
	} else {
		// Иначе возвращаем только отформатированную целую часть
		return formattedIntegerPart;
	}
}
// send data to front
const sendDataSummary = function() {
	{// send data to expand summary block and update in modal-footer section
		frontData.forEach(el => {
			let data = summaryData.find(item => {
				return item.dataName == el.dataset.name;
			})
			//find and compare data from front and in summaryData
			if (data.dataName === el.dataset.name && data.dataName != undefined && el.dataset.name != undefined) {
				el.innerText = formatNumber(data.total)
			}
		})
	}
}

// sendData to inputs in checked image types
const sendDataInputs = function(...data) {
	//let frontInput = document.querySelector("input[name="+data[0].name+"]");
	let frontInput = document.querySelectorAll("input[name="+data[0].name+"]");
	//data[0].value != undefined ? frontInput.value = data[0].value : frontInput.value = data[0].count;
	if(data[0].value !== undefined){
		frontInput.forEach((inp)=>{
			inp.value = data[0].value
		})
	}else{
		frontInput.forEach((inp)=>{
			inp.value = data[0].count
		})
	}
	calculator()
}

//handele onchange form event and change different data type in summaryData
const inputEvent = function(...itemsData) { //
	// console.log('name: ', name)
	// console.log('value: ', value)
	if (itemsData[1] != 0) { //проверка наличия второго атрибута
		resetPrevState()
		let planValue = summaryData.find(el => {
			return el.value === itemsData[1]
		})
		let planSelected = summaryData.find(item => {
			return item.value === Number(itemsData[0].value)
		})
		planSelected.state = true;
		switch (planSelected.dataName) {
			case "plan_a": {// free
				getStartedBtn.querySelector(".btn-text-calc").innerText = "get started";
				getStartedBtn.href = "/services"
				break;
			}
			case "plan_d": {// Starter
				getStartedBtn.querySelector(".btn-text-calc").innerText = "become a member"
				getStartedBtn.href = "https://buy.stripe.com/eVa8wC9C5cY3gE0cMV"
				break;
			}
			case "plan_b": {// Growth
				getStartedBtn.querySelector(".btn-text-calc").innerText = "become a member"
				getStartedBtn.href = "https://buy.stripe.com/7sIfZ4g0tgaf73qdQX"
				break;
			}
			case "plan_c": {// Enterprise
				if(summaryData.find(el => el.name === 'discount').state){ // if discount = true
					getStartedBtn.querySelector(".btn-text-calc").innerText = "become a member"
					getStartedBtn.href = "https://buy.stripe.com/cN2aEK01v6zFbjGaEJ" // if discount = true
				}else{
					getStartedBtn.querySelector(".btn-text-calc").innerText = "become a member"
					getStartedBtn.href = "https://buy.stripe.com/aEU4gmdSlcY3gE04gk" // if discount = false
				}

				break;
			}
		}
		calculator()
		// itemsData[0].forEach(el => {
		// 	if (el.checked == true) {
		// 		let planSelected = summaryData.find(item => {
		// 			return item.value === Number(el.value)
		// 		})
		// 		planSelected.state = true;
		// 		calculator()
		// 	}
		// })
	}
	else if (itemsData[0].name != 'discount'){
		let imageTypeName = summaryData.find(el => {
			return el.name === itemsData[0].name
		})
		imageTypeName.count = Number(itemsData[0].value) // перезаписывает значение из input в summaryData
		sendDataInputs(imageTypeName, Number(itemsData[0].value))
	}
	else if (itemsData[0].name == 'discount') { // проверка attribute name="discount"
		if (itemsData[0].checked) {
			summaryData.find(el => {
				return el.name === itemsData[0].name
			}).state = true;
			let currentPlan =  checkPlanSelected()
			if(currentPlan.dataName === "plan_c"){
				getStartedBtn.href = "https://buy.stripe.com/cN2aEK01v6zFbjGaEJ" // if discount = true
			}
			calculator();
		}
		else {
			summaryData.find(el => {
				return el.name === itemsData[0].name
			}).state = false;
			let currentPlan =  checkPlanSelected()
			if(currentPlan.dataName === "plan_c"){
				getStartedBtn.href = "https://buy.stripe.com/aEU4gmdSlcY3gE04gk" // if discount = false
			}

			calculator();
		}
	}
	else {
		console.log('else')
	}
	//console.log(summaryData) // test

}

//find all inputs
for (i = 0; i < formData[0].length; i++) {
	let data = formData[0][i];
	let elementValue = data.getAttribute('value');
	let elementName = data.getAttribute('name');
	//data.setAttribute("oninput", "inputEvent("+elementName+","+ Number(elementValue)+")");
	data.setAttribute("oninput", "inputEvent(this,"+ Number(elementValue)+")");
}

// find and cahnge summaryData[index].cont++
for (i = 0; i < btnPlus.length; i++) {
	btnPlus[i].setAttribute("index", i)
	btnPlus[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index'))
		})
		counterPlus(indexItem)
		sendDataInputs(indexItem)
	})
}
// find and cahnge summaryData[index].cont++
for (i = 0; i < btnMinus.length; i++) {
	btnMinus[i].setAttribute("index", i)
	btnMinus[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index'))
		})
		counterMinus(indexItem); // object
		sendDataInputs(indexItem); // object
	})
}

//find all checked checkbox image types
for (i = 0; i < imageCheckbox.length; i++) {
	imageCheckbox[i].setAttribute("index", i)
	imageCheckboxChildNodes[i].childNodes.forEach(el => {
		el.setAttribute('index', i)
	})

	imageCheckbox[i].addEventListener('click', function(e) {
		let indexItem = summaryData.find(el => {
			return el.index === Number(e.target.getAttribute('index'))
		})
		imageChecked(indexItem); // object
	})
}

//calculator
const calculator = function() {

	let imageSummaryItems = [];
	let imagePricePlan = [];
	let imagePricePlanStandart = [];
	let imageTotal = [];
	let imageTotalStandart = [];

	{//calculate image count
		summaryData.forEach(item => {
			if (item.count != undefined) {
				imageSummaryItems.push(item.count);
			}
		})

		let result = imageSummaryItems.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue)
		}, 0);

		summaryData.find(item => item.dataName === 'image_total_count').total = result;

	}

	{//checkPlanSelected
		let plan = checkPlanSelected(); // object
		console.log(plan)
		let getImagePrice = summaryData.forEach(el => {
				if (el.price) {
					let priceItem = el.price[plan.dataName]
					let priceItemStandart = el.price["plan_a"]
					imagePricePlan.push(priceItem)
					imagePricePlanStandart.push(priceItemStandart)
				}
			})
	}

	{//calculate image price &
		for (i = 0; i < imageSummaryItems.length; i++) {
			if (imageSummaryItems[i] > 0) {
				let imagePriceSummary = imageSummaryItems[i] * imagePricePlan[i]
				let imagePriceSummaryStandart = imageSummaryItems[i] * imagePricePlanStandart[i]
				imageTotal.push(imagePriceSummary)
				imageTotalStandart.push(imagePriceSummaryStandart)
			}
		}
		let result = imageTotal.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue)
		}, 0);
		let resultStandart = imageTotalStandart.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue)
		}, 0);
		summaryData.find(item => item.dataName === 'image_total').total = result;
		summaryData.find(item => item.dataName === 'image_total').totalStandart = resultStandart;
	}

	{//show data price in summary
		let minPrice = Math.min(...imagePriceSelected());
		let maxPrice = Math.max(...imagePriceSelected());
		if (imagePriceSelected().length === 1) {
			summaryData.find(item => item.dataName === 'peice_per_image').total = minPrice;
		}
		else if (imagePriceSelected().length > 1) {
			summaryData.find(item => item.dataName === 'peice_per_image').total = minPrice+"-$"+maxPrice
		}
		else {
			summaryData.find(item => item.dataName === 'peice_per_image').total = 0;
		}
	}

	{//membership plan info selected
		let plan = checkPlanSelected();
		let discountStatus = summaryData.find(el => el.name === 'discount').state

		if (discountStatus === true && plan.planInfo.activeDiscount != undefined) {
			summaryData.find(item => item.dataName === 'plan_info').total = isMobileResolution()?plan.planInfo.activeDiscountMob:plan.planInfo.activeDiscount
			summaryData.find(item => item.dataName === 'plan_info').planPrice = plan.planPrice.activeDiscount
		}
		else if (plan.planInfo.activeDiscount == undefined) {
			summaryData.find(item => item.dataName === 'plan_info').total = plan.planInfo
			summaryData.find(item => item.dataName === 'plan_info').planPrice = 0;
		}
		else {
			summaryData.find(item => item.dataName === 'plan_info').total = isMobileResolution()?plan.planInfo.disableDiscountMob:plan.planInfo.disableDiscount;
			summaryData.find(item => item.dataName === 'plan_info').planPrice = plan.planPrice.disableDiscount;
		}
	}

	{//calculate save & total
		let plan = checkPlanSelected();
		let imageTotalSum =	summaryData.find(item => item.dataName === "image_total").total
		let imageTotalSumStandart =	summaryData.find(item => item.dataName === "image_total").totalStandart
		let planPrice = summaryData.find(item => item.dataName === "plan_info").planPrice
		let saveData = summaryData.find(item => item.dataName === 'save');
		let calcTotal = summaryData.find(item => item.dataName === 'total');
		calcTotal.total = planPrice + imageTotalSum;

		// if (plan.value == 2) { // GROWTH 20%
		// 	// let calcSave = Math.round(Number((imageTotalSum)*0.25) + Number(imageTotalSum), 1)
		// 	// calcSave - (imageTotalSum + planPrice) < 0 ? saveData.total = 0 : saveData.total = calcSave - (imageTotalSum + planPrice);
		// }
		// else if (plan.value == 3) { // ENTERPRISE 30%
		// 	// let calcSave = Math.round(Number((imageTotalSum)*0.42857142857142854) + Number(imageTotalSum), 1)
		// 	// calcSave - (imageTotalSum + planPrice) < 0 ? saveData.total = 0 : saveData.total = calcSave - (imageTotalSum + planPrice);
		// }
		// else if (plan.value == 4) { // STARTER 10%
		// 	// let calcSave = Math.round(Number((imageTotalSum)*0.42857142857142854) + Number(imageTotalSum), 1)
		// 	// calcSave - (imageTotalSum + planPrice) < 0 ? saveData.total = 0 : saveData.total = calcSave - (imageTotalSum + planPrice);
		// 	let calcSave = Math.round(Number(imageTotalSumStandart) - (Number(imageTotalSum) + planPrice), 1)
		// 	calcSave>0?saveData.total = calcSave:saveData.total = 0
		// }
		if(plan.value > 1){
			let calcSave = Math.round(Number(imageTotalSumStandart) - (Number(imageTotalSum) + planPrice), 1)
			calcSave>0?saveData.total = calcSave:saveData.total = 0
		}else {
			saveData.total = 0;
		}
	}
	sendDataSummary()
}
