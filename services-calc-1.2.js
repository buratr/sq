document.addEventListener('DOMContentLoaded', function () {
    const opencart = new Event('opencart');
    let fillForm = {
        objects: false,
        shadow: false,
        number: false,
    }
    let showParam = {}
    let currentPos = {
        group:"",
        shoot: document.querySelector('#option-list-shoot').firstElementChild.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase(),
        shootTitle: document.querySelector('#option-list-shoot').firstElementChild.querySelector('.title-trigger').innerHTML,
        obj: null,
        objTitle: null,
        shadow: null,
        count: null,
        price: null,
        enterprise: null,
        steam: false,
        subtotal: 0,
        steamCount: 0,
        assembling: 0,
        title: catTitle.innerHTML,
        img: "http",
        addons: [],
        options: [],
        estimate:{
            name: null,
            percent: 0,
            planPrice: 0
        }
    }

    // Получаем последний сегмент пути
    function getLastPathSegment() {
        var currentUrl = window.location.href;
        var urlSegments = currentUrl.split('/');
        var lastSegment = urlSegments[urlSegments.length - 1];
        return lastSegment;
    }
    var lastPathSegment = getLastPathSegment();
    let shotTypeMass={

    }
    /*** Коэффициент сходства ***/
    function calculateWordSimilarity(string1, string2) {
        // Разбиваем строки на слова с учетом дефиса как разделителя
        const words1 = string1.toLowerCase().split(/[\s-]+/).filter(Boolean);
        const words2 = string2.toLowerCase().split(/[\s-]+/).filter(Boolean);
        // Находим количество совпадающих слов
        const commonWordsCount = words1.filter(word => words2.includes(word)).length;
        // Вычисляем процент сходства по словам
        const similarityPercentage = (commonWordsCount / Math.max(words1.length, words2.length)) * 100;
        return similarityPercentage;
    }

    /****** SCROLL CONTROLL on/off  ******/
    var Webflow = Webflow || [];
    var $body = $(document.body);
    var scrollPosition = 0;

    function scrollOff() {
        var oldWidth = $body.innerWidth();
        scrollPosition = window.pageYOffset;
        $body.css('overflow', 'hidden');
        $body.css('position', 'fixed');
        $body.css('top', `-${scrollPosition}px`);
        $body.width(oldWidth);
    }

    function scrollOn() {
        if ($body.css('overflow') != 'hidden') {
            scrollPosition = window.pageYOffset;
        }
        $body.css('overflow', '');
        $body.css('position', '');
        $body.css('top', '');
        $body.width('');
        $(window).scrollTop(scrollPosition);
    }

    function getImageForCart(obj) {
        let objTime = document.querySelector('#option-list-objects')
        let obj_list = objTime.querySelectorAll('.option-item')
        obj_list.forEach((item) => {
            let title = item.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
            if (title === obj) {
                currentPos.img = item.querySelector('img').src
            }
        })
    }

//window.currentPos=currentPos
//console.log(currentPos)
    let price = {}
    document.querySelectorAll('.info-price').forEach((price_wrap) => {
        let data_shot = price_wrap.querySelector('.shoot').innerHTML.split(" ")[0].toLowerCase()
        let data_object = price_wrap.querySelector('.objects').innerHTML.split(" ")[0].toLowerCase()
        let priceVal = Number(price_wrap.querySelector('.price').innerHTML)
        if ((priceVal ^ 0) != priceVal) {
            priceVal = priceVal.toFixed(2)
        }
        let enterpriseVal = Number(price_wrap.querySelector('.enterprise').innerHTML)
        if ((enterpriseVal ^ 0) != enterpriseVal) {
            enterpriseVal = enterpriseVal.toFixed(2)
        }
        let sliderImgArr = []
        price_wrap.querySelectorAll('.prev-img').forEach((img) => {
            sliderImgArr.push(img.src)
        })

        if (!showParam.hasOwnProperty([data_shot])) {
            showParam[data_shot] = [];
            showParam[data_shot].push(data_object);
        } else {
            showParam[data_shot].push(data_object);
        }

        price_wrap.setAttribute("data-shoot", data_shot);
        price_wrap.setAttribute("data-objects", data_object);
        let priceGroup = data_shot + "_" + data_object;
        price[priceGroup] = {
            price: priceVal,
            enterprise: enterpriseVal,
            slider: sliderImgArr
        }
    })// info-price => forEach

    let imagesForObjects = {}
    document.querySelectorAll('.images-for-objects').forEach((el) => {
        let titleShot = el.querySelector('.title-shoot').innerHTML.split(" ")[0].toLowerCase();
        //console.log(titleShot);
        imagesForObjects[titleShot] = {};
        el.querySelectorAll('.img-for-obj-wrap').forEach((imgWrap) => {
            let titleObj = imgWrap.querySelector('.title-obj').innerHTML.split(" ")[0].toLowerCase();
            let srcImg = imgWrap.querySelector('.prev-img').src;
            imagesForObjects[titleShot][titleObj] = srcImg;
        })
    })

//console.log(imagesForObjects);

    function errorTitle(title, status) {
        status ? title.classList.add("t-20-700-title-err") : title.classList.remove("t-20-700-title-err")
    }
    function errorTitleElement(titleElement, status) {
        status ?  titleElement.classList.add("t-20-700-title-err") : titleElement.classList.remove("t-20-700-title-err")
    }
//== Пересчет цены ==//
    function recalculatePrice() {
        // currentPos.price = price[currentPos.shoot + "_" + currentPos.obj].price
        // currentPos.enterprise = price[currentPos.shoot + "_" + currentPos.obj].enterprise
        // sumPrice.innerHTML = currentPos.price;
        // sumEnterprise.innerHTML = currentPos.enterprise;
        currentPos.options.forEach((option)=>{
            if(price[currentPos.shoot + "_" + option.value]) {
                currentPos.price = price[currentPos.shoot + "_" + option.value].price
                currentPos.enterprise = price[currentPos.shoot + "_" + option.value].enterprise
                sumPrice.innerHTML = currentPos.price * (1 - currentPos.estimate.percent / 100);
                sumEnterprise.innerHTML = currentPos.enterprise;
            }
        })
    }
    function recalculatePriceUniversal(optionName) {
        currentPos.options.forEach((option)=>{
            if(price[currentPos.shoot + "_" + option.value]) {
                currentPos.price = price[currentPos.shoot + "_" + option.value].price
                currentPos.enterprise = price[currentPos.shoot + "_" + option.value].enterprise
                sumPrice.innerHTML = currentPos.price * (1 - currentPos.estimate.percent / 100);
                sumEnterprise.innerHTML = currentPos.enterprise;
            }
        })

    }
//== Заполнение слайдера новыми картинками ==//
    function sliderChange(newImgSet) {
        document.querySelectorAll('.small-img').forEach((imgWrap) => {
            let idImg = imgWrap.querySelector('.t-16-700').innerHTML;
            let img = imgWrap.querySelector('img');
            img.sizes = "";
            img.srcset = "";
            img.src = newImgSet[idImg];
        });
        document.querySelectorAll('.big-img').forEach((imgWrap) => {
            let idImg = imgWrap.querySelector('.t-16-700').innerHTML;
            let img = imgWrap.querySelector('img');
            img.sizes = "";
            img.srcset = "";
            img.src = newImgSet[idImg];
        });
//newImgSet.forEach();
    }

//====== Функции переключения тригеров  ========//


    let servSliderSticky = document.querySelector('.serv-slider-sticky');

    function visibleObjects(arr) {
        objects.querySelectorAll('.option-item').forEach((item) => {
            item.classList.add("option-item-hide")
        })
        arr.forEach((el) => {
            objects.querySelectorAll('.option-item').forEach((item) => {
                item.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
                if (item.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase() === el) {
                    item.classList.remove("option-item-hide")
                }
            })
        })
    }

    function resetSelect(optionList) {
        optionList.forEach((tr) => {
            tr.querySelector('.trigger-wrap').classList.remove("trigger-wrap-active");
        })
    }

    /**** Тригеры SHOOT *****/
    let firstShot = null;

    /** Инициализация опций для тегущего товара **/
    let shootType = document.querySelector('#shoot-type');
    let shootType_triggers = shootType.querySelectorAll('.option-item');
    let objects = document.querySelector('#objects');
    let shadow = document.querySelector('#shadow');
    let objects_triggers = objects.querySelectorAll('.option-item');
    let shadow_triggers = shadow.querySelectorAll('.option-item');

    function optionInit(){

        shootType_triggers.forEach((tr, id) => {
            console.log(tr.querySelector(".title-trigger").innerText)
            console.log(getLastPathSegment())
            console.log(calculateWordSimilarity(tr.querySelector(".title-trigger").innerText, getLastPathSegment()))

            // Находим соответствующий триггер SHOOT в зависимости от ссылки
            if(calculateWordSimilarity(tr.querySelector(".title-trigger").innerText, getLastPathSegment()) > 30){
                tr.querySelector(".trigger-wrap").classList.add("trigger-wrap-active")
                if(calculateWordSimilarity(tr.querySelector(".title-trigger").innerText, "model") > 30){
                    currentPos.group = "model"
                }else{
                    currentPos.group = "product"
                }
                currentPos.img =tr.querySelector(".trigger-img").src
                // если в триггере включен Shadow
                let inShadow = getComputedStyle(tr.querySelector('.in-shadow')).display == 'none' ? false : true;
                if (!inShadow) {
                    fillForm.shadow = true;
                    resetSelect(shadow_triggers);
                    currentPos.shadow = null;
                    shadow.classList.add("services-calc-cms-item-hide");
                    errorTitle(shadowTitle, false)
                } else {
                    if (currentPos.shadow === null) {
                        fillForm.shadow = false;
                    }
                    shadow.classList.remove("services-calc-cms-item-hide")
                }

                // если в триггере включен Object
                let inObject = getComputedStyle(tr.querySelector('.in-object')).display == 'none' ? false : true;
                if (!inObject) {
                    fillForm.objects = true;
                    resetSelect(objects_triggers);
                    currentPos.obj = "single";
                    currentPos.objTitle = null;
                    objects.classList.add("services-calc-cms-item-hide");
                    errorTitle(objectsTitle, false)
                } else {
                    if (currentPos.objTitle === null) {
                        fillForm.objects = false;
                    }
                    objects.classList.remove("services-calc-cms-item-hide")
                }

                //console.log(inShadow);
                currentPos.shootTitle = tr.querySelector('.title-trigger').innerHTML;
                let titleShotType = tr.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
                visibleObjects(showParam[titleShotType])
                //console.log(titleShotType)
                currentPos.shoot = titleShotType;
                resetSelect(shootType_triggers);
                tr.querySelector('.trigger-wrap').classList.add("trigger-wrap-active");
                // заполняем новыми картинками OBJECTS
                if (inObject) {
                    objects_triggers.forEach((trigger) => {
                        let titleTriggerObj = trigger.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
                        if (showParam[titleShotType].includes(currentPos.obj)) {
                            trigger.querySelector('img').sizes = "";
                            trigger.querySelector('img').srcset = "";
                            trigger.querySelector('img').src = imagesForObjects[titleShotType][titleTriggerObj];
                        } else {
                            currentPos.obj = "single";
                            resetSelect(objects_triggers);
                            fillForm.objects = false;
                        }

                    })
                }
                recalculatePrice()
                recalcIroning()
                sliderChange(price[currentPos.shoot + "_" + currentPos.obj].slider)
                //getImageForCart(currentPos.obj)
            } // if (trigger_name === pathLink)
        })//shootType_triggers.forEach

        document.querySelectorAll(".options-block .services-calc-cms-item").forEach((option, optionId)=>{
            let optionName = option.querySelector(".t-20-700-title").innerText
            let groupName = optionName.toLowerCase().replaceAll(" ","_")
            if( getComputedStyle(option).display !== 'none' ){
                currentPos.options.push({
                    groupName: groupName,
                    optionTitle: optionName,
                    value: null,
                    obj: option
                })
            }
            let massTrigger = option.querySelectorAll(".option-list .option-item")
            massTrigger.forEach((tr,id)=>{

                tr.addEventListener('click', () => {
                    errorTitleElement(option.querySelector(".t-20-700-title"), false)
                    resetSelect(massTrigger);
                    tr.querySelector('.trigger-wrap').classList.add("trigger-wrap-active");
                    let optionVal = tr.querySelector('.title-trigger').innerText.toLowerCase().replaceAll(" ","_")
                    changeOptionCurrentPos(groupName, tr.querySelector('.title-trigger').innerText, optionVal)

                    if(price[currentPos.shoot + "_" + optionVal]){
                        recalculatePriceUniversal(optionVal)
                        recalcSubtotal()
                        sliderChange(price[currentPos.shoot + "_" + optionVal].slider)
                    }

                    console.log(currentPos)
                })
                if (id === 0 && optionId === 0) {
                    tr.click()
                }
            })
        })
    }// optionInit

    /** Изменение значения в определенной групе опции **/
    function changeOptionCurrentPos(groupName, optionTitle, value){
        let option = currentPos.options.find(item => item.groupName === groupName);
        if(groupName === "shadow" && optionTitle === "NONE"){
            option.optionTitle = "No shadow"
        }else{
            option.optionTitle = optionTitle
        }
        
        option.value = value
        // console.log(option)
        // console.log(currentPos)
    }
    optionInit()

    /*
    shootType_triggers.forEach((tr, id) => {
        tr.addEventListener('click', () => {
            let inShadow = getComputedStyle(tr.querySelector('.in-shadow')).display == 'none' ? false : true;
            if (!inShadow) {
                fillForm.shadow = true;
                resetSelect(shadow_triggers);
                currentPos.shadow = null;
                shadow.classList.add("services-calc-cms-item-hide");
                errorTitle(shadowTitle, false)
            } else {
                if (currentPos.shadow === null) {
                    fillForm.shadow = false;
                }
                shadow.classList.remove("services-calc-cms-item-hide")
            }

            let inObject = getComputedStyle(tr.querySelector('.in-object')).display == 'none' ? false : true;
            if (!inObject) {
                fillForm.objects = true;
                resetSelect(objects_triggers);
                currentPos.obj = "single";
                currentPos.objTitle = null;
                objects.classList.add("services-calc-cms-item-hide");
                errorTitle(objectsTitle, false)
            } else {
                if (currentPos.objTitle === null) {
                    fillForm.objects = false;
                }
                objects.classList.remove("services-calc-cms-item-hide")
            }


            //console.log(inShadow);
            currentPos.shootTitle = tr.querySelector('.title-trigger').innerHTML;
            let titleShotType = tr.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
            visibleObjects(showParam[titleShotType])
            //console.log(titleShotType)
            currentPos.shoot = titleShotType;
            resetSelect(shootType_triggers);
            tr.querySelector('.trigger-wrap').classList.add("trigger-wrap-active");
            // заполняем новыми картинками OBJECTS
            if (inObject) {
                objects_triggers.forEach((trigger) => {
                    let titleTriggerObj = trigger.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
                    if (showParam[titleShotType].includes(currentPos.obj)) {
                        trigger.querySelector('img').sizes = "";
                        trigger.querySelector('img').srcset = "";
                        trigger.querySelector('img').src = imagesForObjects[titleShotType][titleTriggerObj];
                    } else {
                        currentPos.obj = "single";
                        resetSelect(objects_triggers);
                        fillForm.objects = false;
                    }

                })
            }
            recalculatePrice()
            recalcIroning()
            sliderChange(price[currentPos.shoot + "_" + currentPos.obj].slider)
            getImageForCart(currentPos.obj)
        })
        if (id == 0) {
            firstShot = tr
        }
    })//shootType_triggers
*/

    /**** Инициализация тригеров  *****/

    /**** Тригеры OBJECTS *****/
    // let firstObject = null;
    // objects_triggers.forEach((tr, id) => {
    //     tr.addEventListener('click', () => {
    //         errorTitle(objectsTitle, false)
    //         resetSelect(objects_triggers);
    //         tr.querySelector('.trigger-wrap').classList.add("trigger-wrap-active");
    //         currentPos.objTitle = tr.querySelector('.title-trigger').innerHTML;
    //         currentPos.obj = tr.querySelector('.title-trigger').innerHTML.split(" ")[0].toLowerCase();
    //         recalculatePrice()
    //         recalcIroning()
    //         sliderChange(price[currentPos.shoot + "_" + currentPos.obj].slider)
    //         fillForm.objects = true
    //         getImageForCart(currentPos.obj)
    //         console.log(currentPos)
    //     })
    //     if (id == 0) {
    //         firstObject = tr
    //     }
    // })

    /**** Тригеры SHADOW *****/
    // shadow_triggers.forEach((tr) => {
    //     tr.addEventListener('click', () => {
    //         errorTitle(shadowTitle, false)
    //         resetSelect(shadow_triggers);
    //         tr.querySelector('.trigger-wrap').classList.add("trigger-wrap-active");
    //         currentPos.shadow = tr.querySelector('.title-trigger').innerHTML;//.split(" ")[0].toLowerCase();
    //         recalculatePrice()
    //         fillForm.shadow = true
    //     })
    // })
    /**** Тригеры NUMBER *****/
    let btnSpecify = document.querySelector('#btn-specify');
    let btnSkip = document.querySelector('#btn-skip');

    function recalcSubtotal() {
        if (!currentPos.count) {
            subtotal.innerHTML = "TBD";
            currentPos.subtotal = "TBD";
            return;
        }
        if (currentPos.count == "skip") {
            subtotal.innerHTML = "TBD";
            currentPos.subtotal = "TBD";
            return;
        }
        let count = currentPos.count == "skip" ? 1 : currentPos.count
        let val = count * Number(currentPos.price) * (1 - currentPos.estimate.percent / 100) //+ currentPos.estimate.planPrice

        if (currentPos.addons.length > 0) {
            currentPos.addons.forEach((ons) => {

                if(ons.count > 0 && ons.price === "TBD"){
                    subtotal.innerHTML = "TBD";
                    currentPos.subtotal = "TBD";
                    val = "TBD";
                    return;
                }else{
                    if(val !== "TBD" && ons.count > 0 && ons.price !== "TBD"){
                        val += ons.count * ons.price
                    }
                }
            })
        }

//if(currentPos.steam){val += currentPos.steamCount*3}
        if(val === "TBD"){return;}

        currentPos.subtotal = val
        if (val > 1000) {
            let thous = Math.floor(val / 1000)
            let rest = val - thous * 1000
            let re
            if (rest < 10) {
                re = "00" + rest
            } else if (rest < 100) {
                re = "0" + rest
            } else {
                re = rest
            }
            subtotal.innerHTML = "$" + thous + "," + re
        } else {
            subtotal.innerHTML = "$" + val
        }
    }

    function recalcIroning() {
//ironingItems.innerHTML = currentPos.steamCount?currentPos.steamCount:0
//ironingSubtotal.innerHTML = currentPos.steamCount*3
        recalcSubtotal()
        recalculatePrice()
    }

    function show_1() {
        errorTitle(numberTitle, false)
        numBtnSelect.classList.remove("button-select-wrap-hide");
        resultNum.classList.add("result-number-wrap-hide");
        formSetNum.classList.add("set-number-wrap-hide");
    }

    function show_2() {
        errorTitle(numberTitle, false)
        numBtnSelect.classList.add("button-select-wrap-hide");
        formSetNum.classList.remove("set-number-wrap-hide");
    }

    function show_3() {
        errorTitle(numberTitle, false)
        btnSkip.classList.remove("button-select-active");
        numBtnSelect.classList.add("button-select-wrap-hide");
        formSetNum.classList.add("set-number-wrap-hide");
        resultNum.classList.remove("result-number-wrap-hide");
    }

    btnSpecify.addEventListener('click', () => {
        show_2(); /*console.log(currentPos)*/
    })// откр форм ввода кол
    setNumCancel.addEventListener('click', () => {
        show_1(); /*console.log(currentPos)*/
    })// отм ввода кол
    setNumAdd.addEventListener('click', () => {// добавление количества
        let numImgs = Number(inputNumberImgs.value)
        if (numImgs < 1) {
            inputNumberImgs.oninput = function () {
                inputNumberImgs.classList.remove("input-number-img-err")
            };
            inputNumberImgs.classList.add("input-number-img-err");
            return;
        }
        resultNumText.innerHTML = numImgs
        currentPos.count = numImgs
        recalcIroning()
//ironingActive(currentPos.steam)
        show_3()
//console.log(currentPos)
        fillForm.number = true
    })
    btnRemoveNum.addEventListener('click', () => {// сброс количества
        currentPos.count = null
//ironingActive(false)
        recalcIroning()
        show_1()
        fillForm.number = false
    })

    btnSkip.addEventListener('click', () => {
        errorTitle(numberTitle, false)
        btnSpecify.classList.remove("button-select-active")
        btnSkip.classList.add("button-select-active")
        currentPos.count = "skip"
        recalcIroning()
//ironingActive(currentPos.steam)
        fillForm.number = true
    })

    /**** Тригеры ADD ONS *****/
    function addOnsMod(modal, stat) {
        stat ? modal.classList.add("stmodactive") : modal.classList.remove("stmodactive")
    }

    function ironingActive(onsBlok, status) {
        let addOnsBtn = onsBlok.querySelector('.add-ons-btn')
        let checkIcon = onsBlok.querySelector('.check-icon')
        let ironingPattern = onsBlok.querySelector('.ironing-pattern')
        let ironItemText = onsBlok.querySelector('.add-ons-price-wrap')
        let btnAddOnsRemove = onsBlok.querySelector('.btn-add-ons-remove')
        let setNumberBtn = onsBlok.querySelector('.set-number-btn-dark--new')
        let name = onsBlok.querySelector(".steam-title").innerText
        let addOnsStat = currentPos.addons.find(item => item.name === name);
        if (status) {
            addOnsBtn.classList.add("add-ons-btn-visible")
            addOnsBtn.querySelector(".t-16-700").style.display = "none"
            addOnsBtn.querySelector(".add-ons-edit").style.display = "block"

            onsBlok.classList.add("add-ons-wrap-active")
            checkIcon.classList.add("check-icon-hide")
//currentPos.count !== "skip"?ironingPattern.classList.add("ironing-pattern-visible"):ironingPattern.classList.remove("ironing-pattern-visible");
            ironingPattern.classList.add("ironing-pattern-visible")
            ironItemText.classList.add("add-ons-price-wrap-disable")
            btnAddOnsRemove.classList.add("btn-add-ons-remove-visible")
            setNumberBtn.classList.add("set-number-btn-dark--new--hide")
            addOnsStat.addOnsActive = true
            currentPos.steam = true
        } else {
            checkIcon.classList.remove("check-icon-hide")
            btnAddOnsRemove.classList.remove("btn-add-ons-remove-visible")
            setNumberBtn.classList.remove("set-number-btn-dark--new--hide")
            addOnsBtn.classList.remove("add-ons-btn-visible")
            addOnsBtn.querySelector(".t-16-700").style.display = ""
            addOnsBtn.querySelector(".add-ons-edit").style.display = ""
            onsBlok.classList.remove("add-ons-wrap-active")
            ironingPattern.classList.remove("ironing-pattern-visible")
            ironItemText.classList.remove("add-ons-price-wrap-disable")
            currentPos.steam = false
            currentPos.steamCount = 0
            addOnsStat.addOnsActive = false
        }
    }

    function changVisibleBtnInModal(onsBlock){
        let btnAddOnsRemove = onsBlock.querySelector('.btn-add-ons-remove')
        let setNumberBtn = onsBlock.querySelector('.set-number-btn-dark--new')
        let name = onsBlock.querySelector(".steam-title").innerText
        let addOnsStat = currentPos.addons.find(item => item.name === name);
        if(addOnsStat.addOnsActive === true){
            setNumberBtn.querySelector("div").innerText = "Update"
            setNumberBtn.classList.remove("set-number-btn-dark--new--hide")
            btnAddOnsRemove.classList.remove("btn-add-ons-remove-visible")
        }
    }

    /*
    addOnsBtn.addEventListener('click', ()=>{addOnsMod(steamModal, true)
    //ironingActive(true)
    //recalcIroning()
    })

    clSt.addEventListener('click', ()=>{addOnsMod(steamModal, false)})		// close Steam
    steanCancel.addEventListener('click', ()=>{addOnsMod(steamModal, false)})
    steanAdd.addEventListener('click', ()=>{
        if(inputSteam.value < 1){
            inputSteam.oninput = function() {inputSteam.classList.remove("input-number-img-err")};
            inputSteam.classList.add("input-number-img-err");return;
        }
        currentPos.steamCount = Number(inputSteam.value)
        ironingActive(true)
        addOnsMod(steamModal, false)
        recalcIroning()
    })

    btnAddOnsRemove.addEventListener('click', ()=>{
    ironingActive(false)
    recalcIroning()
    })
    */
    function addOnsOptionActive(addOns, option=null, addOnsOption_obj){
        addOnsOption_obj.forEach((opt)=>{opt.status=false})
        addOns.querySelectorAll(".add-ons-option").forEach((opt)=>{
            opt.classList.remove("add-ons-option--active")
        })
        if(option){
            option.classList.add("add-ons-option--active")
            addOnsOption_obj.find(opt => opt.name === option.querySelector('.t-16-700').innerHTML).status = true
        }
        //console.log(addOnsOption_obj)

    }

    /************ TEST ADD ONS *************/
    let modalRemove = document.querySelector(".pop-up-add-ons-remove")
    let modalRemove_close = document.querySelector(".add-ons-remove-close")
    function modalRemove_hide(){modalRemove.classList.remove("pop-up-add-ons-remove--visible")}
    modalRemove_close.addEventListener("click", ()=>{modalRemove_hide()})

    let addOns_list = document.querySelectorAll('.add-ons-wrap')

    addOns_list.forEach((addOns) => {
        function option_err(status){
            if(status){
                addOns.querySelector('.add-ons-option-err').classList.add("add-ons-option-err--visible")
                addOns.querySelector('.custom-lightbox-info-block--option').children[0].classList.add("t-subtitle-light--service--err")
            }else {
                addOns.querySelector('.add-ons-option-err').classList.remove("add-ons-option-err--visible")
                addOns.querySelector('.custom-lightbox-info-block--option').children[0].classList.remove("t-subtitle-light--service--err")
            }
        }
        // если фиксированная цена или включены опции, устанавливаем количество 1 по умолчанию
        let fixPrice = getComputedStyle(addOns.querySelector('.number-of-item-blok')).display == 'none' ? true : false;
        if (fixPrice) {
            addOns.querySelector('.input-number-img').value = 1;
        }
        let addOnsOption_price = null;
        let addOnsOption_obj =[]
        // если включены опции, определяем каждую опцию и обрабатываем клики по ним
        let addOns_option_stat = getComputedStyle(addOns.querySelector('.custom-lightbox-info-block--option')).display == 'none' ? false : true;
        if (addOns_option_stat) {
            //console.log(addOns.querySelectorAll(".add-ons-option"))
            addOns.querySelectorAll(".add-ons-option").forEach((option)=>{
                if(getComputedStyle(option).display !== 'none'){                        // если опция включена, заполняем объект и слушаем клики
                    addOnsOption_obj.push({
                        status: false,
                        name: option.querySelector('.t-16-700').innerHTML,
                        desc: option.querySelector('.t-16-400').innerHTML,
                        price:option.querySelector('.modal-porice-wrap').children[1].innerHTML,

                        price_option: getComputedStyle(option.querySelector('.price-option')).display == 'none'?false: option.querySelector('.price-option div').innerHTML,

                    })
                    option.addEventListener("click", ()=>{
                        addOnsOptionActive(addOns, option, addOnsOption_obj)
                        option_err(false)
                        changVisibleBtnInModal(addOns)
                    })
                }
            })
        }

        
        let valPriceAddOnse = addOns.querySelector('.modal-porice-wrap').children[1]
        let val = Number(valPriceAddOnse.innerHTML)

        if (val > 1000) {
            let thous = Math.floor(val / 1000)
            let rest = val - thous * 1000
            let re
            if (rest < 10) {
                re = "00" + rest
            } else if (rest < 100) {
                re = "0" + rest
            } else {
                re = rest
            }
            valPriceAddOnse.innerHTML = thous + "," + re
        } else {
            valPriceAddOnse.innerHTML = val
        }

        let name = addOns.querySelector(".steam-title").innerText
        let btnAddOnsRemove = addOns.querySelector('.btn-add-ons-remove')
        let price = Number(addOns.querySelector('.ons-item-price').innerText)

        currentPos.addons.push({option: addOns_option_stat, option_name:"", option_desc: "", name: name, count: 0, price: price, price_option: false, addOnsActive: false})
        addOns.querySelector(".add-ons-btn").addEventListener('click', () => {// Открываем модалку Адд Онс
            let modal = addOns.querySelector(".steam-modal-bg")
            let close = modal.querySelector(".cancel-icon")
            let cancel = modal.querySelector(".steam-modal-bg-close") //set-modal-cancel
            let addBtn = modal.querySelector(".set-modal-add")
            let onsItems = addOns.querySelector(".ons-items")
            let onsSum = addOns.querySelector(".ons-sum")
            let inputNumber = addOns.querySelector(".input-number-img")
            let setNumberBtn = addOns.querySelector('.set-number-btn-dark--new')


            function helperChangVisibleBtnInModal(){
                changVisibleBtnInModal(addOns)
            }
            inputNumber.addEventListener("input", helperChangVisibleBtnInModal)
            scrollOff()
            addOnsMod(modal, true)

            function clearEvList() {
                inputNumber.removeEventListener("input", changVisibleBtnInModal)
                close.removeEventListener('click', hideModal)
                cancel.removeEventListener('click', hideModal)
                addBtn.removeEventListener('click', setVal)
            }

            function hideModal() {
                if (addOns_option_stat) {
                    addOnsOptionActive(addOns, null, addOnsOption_obj)//убрать выделенные опции Адд Онс
                }
                addOnsMod(modal, false);
                clearEvList();
                scrollOn()
            }

            close.addEventListener('click', hideModal)
            cancel.addEventListener('click', hideModal)

            function setVal() {
                if (addOns_option_stat) {
                    if(!addOnsOption_obj.find(opt => opt.status === true)){
                        option_err(true)
                        console.log("err option")
                        return;
                    }

                }
                let input = modal.querySelector(".input-number-img")
                if (input.value < 1) {
                    input.oninput = function () {
                        input.classList.remove("input-number-img-err")
                    };
                    input.classList.add("input-number-img-err");
                    return;
                }
                scrollOn()

                let current_option = addOnsOption_obj.find(opt => opt.status === true)
                if(addOns_option_stat){
                   
                    addOnsOption_price=current_option.price
                    currentPos.addons.find(addons => addons.name === name).count = 1
                    currentPos.addons.find(addons => addons.name === name).price = addOnsOption_price
                    currentPos.addons.find(addons => addons.name === name).option_name = current_option.name
                    currentPos.addons.find(addons => addons.name === name).option_desc = current_option.desc
                    currentPos.addons.find(addons => addons.name === name).price_option = current_option.price_option

                }else{
                    currentPos.addons.find(addons => addons.name === name).count = Number(input.value)
                }

                onsItems.innerHTML = input.value
                let onsSum_text = addOns_option_stat?addOnsOption_price:input.value * price
                
                onsSum.innerHTML = onsSum_text==="TBD"? "("+onsSum_text+")":onsSum_text

                
                if(current_option?.price_option && current_option.price_option){
                    onsSum.innerHTML = onsSum.innerHTML+current_option.price_option
                }
        
                ironingActive(addOns, true)
                //console.log(currentPos)
                addOnsMod(modal, false)
                recalcIroning()
                clearEvList()
                console.log("currentPos ADD: ", currentPos)
            }

            addBtn.addEventListener('click', setVal)
            btnAddOnsRemove.addEventListener('click', () => {
                currentPos.addons.find(addons => addons.name === name).count = 0
                ironingActive(addOns, false);
                recalcIroning()
                //clearEvList()//?
                hideModal()
                setNumberBtn.querySelector("div").innerText = "ADD SERVICE"
                modalRemove.classList.add("pop-up-add-ons-remove--visible")
                setTimeout(()=>{
                    modalRemove_hide()
                },3000)
            })
        })
    })

    console.log("currentPos: ", currentPos)

    /************ TEST ADD ONS and *************/


    /*** плавная прокрутка ***/
    function currentYPosition() {				// определяет текущее положение скрола
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    function elmYPosition(element) {				// определяет положение элемента
        var elm = element// document.querySelector(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }

    function smoothScroll(element) {					 // функция прокрутки
        var startY = currentYPosition();
        var stopY = elmYPosition(element);
        console.log(stopY)
        /*== кусок для моб версии ==*/
        let width = window.screen.width;
        let vw;
        if (width >= 991) {
            vw = -(width / 100) * 5;
        } else {
            vw = -(width / 100) * 20;
        }
        stopY = stopY + vw;
        /*== кусок для моб версии ==*/
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }

    /****/


    addToCart.addEventListener('click', () => {
        let err = false, scroll = false;
        //console.log(fillForm)
        currentPos.options.forEach(option=>{
            if(!option.value){
                err = true;
                errorTitle(option.obj.querySelector(".t-20-700-title"), true);
                if (!scroll) {
                    scroll = true;
                    smoothScroll(option.obj.querySelector(".t-20-700-title"))
                }
            }

        })
        // if (!fillForm.objects) {
        //     err = true;
        //     errorTitle(objectsTitle, true);
        //     scroll = true;
        //     smoothScroll("objectsTitle")
        // }
        // if (!fillForm.shadow) {
        //     err = true;
        //     errorTitle(shadowTitle, true);
        //     if (!scroll) {
        //         scroll = true;
        //         smoothScroll("shadowTitle")
        //     }
        // }
        if (!fillForm.number) {
            err = true;
            errorTitle(numberTitle, true);
            if (!scroll) {
                smoothScroll(document.getElementById("#numberTitle"))
            }
        }
        if (err) {
            errBlock.classList.add("err-block-show");
            return
        } else {
            errBlock.classList.remove("err-block-show")
        }
        //if(fillForm.objects===true && currentPos.objTitle === null){currentPos.objTitle = "Single"}
        //if(fillForm.shadow===true && currentPos.shadow === null){currentPos.shadow = "No shadow"}

        let clone = JSON.parse(JSON.stringify(currentPos));
        let arrIdDel = []
        if (clone.addons.length > 0) {
            clone.addons.forEach((ons, id) => {
                if (ons.count === 0) {
                    arrIdDel.push(id)

                }
            })
        }
        if (arrIdDel.length > 0) {
            arrIdDel.slice().reverse().forEach(id => {
                clone.addons.splice(id, 1);
            })
        }
        //console.log(clone);
        //console.log(currentPos);
        let localCart = localStorage.getItem('cart');
        if (localCart) {
            localCart = JSON.parse(localCart)
            localCart.cart.push(clone)
            if(clone.estimate.name !== null){
                localCart.estimate = clone.estimate.name
            }
            localStorage.setItem('cart', JSON.stringify(localCart));
//console.log(localCart);
        } else {
            let newCart = {cart: [clone]}
            newCart.estimate = clone.estimate.name
            localStorage.setItem('cart', JSON.stringify(newCart));
//console.log(newCart);
        }
//location.reload()
        window.dispatchEvent(opencart);
    })

    // let first_img = document.querySelector('.big-img-wrap img')
    // setTimeout(() => {
    //     firstShot.click();
    //     firstObject.click();
    //     first_img.onload = function () {
    //         preWrap.classList.add("pre-wrap-opacity"), setTimeout(() => {
    //             preWrap.classList.add("pre-wrap-hide")
    //         }, 300)
    //     }
    // }, 100)

//sliderMain.classList.remove("serv-slider-sticky-opacity")

    let selectEstimate = document.querySelector("#estimate")
// Функция для обработки изменения выбора
    function handleSelectChange() {
        // Получаем выбранный option
        let selectedOption = selectEstimate.options[selectEstimate.selectedIndex];

        // Получаем значения data-first-value и data-second-value
        let Percent = selectedOption.value;
        let planPrice = selectedOption.dataset.planPrice;

        console.log("Percent: ", Percent);
        console.log("Plan price: ", planPrice);
        currentPos.estimate.name = selectedOption.innerText
        currentPos.estimate.percent = Number(Percent)
        currentPos.estimate.planPrice = Number(planPrice)
        recalculatePrice()
        recalcSubtotal()
        console.log(currentPos)
    }

// Добавляем обработчик события change
    selectEstimate.addEventListener("change", handleSelectChange);

})//DOMContentLoaded