
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let dbAcces = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){
    let foundNumber = finesData.find(function(itemObject){
        return itemObject["номер"] === fineNumber.value ;
    });

    if(!foundNumber){
        return alert("Номер не співпадає");
    }

    let gotPassportNumber = /^([а-яїєґ]|[А-ЯЇЄҐ]){2}(\d{6})$/;
    if(!gotPassportNumber.test(passport.value)){
        return alert("Не вірний паспортний номер");
    }

    let gotCreditCard = /^\d{16}$/ ;
    if(!gotCreditCard.test(creditCardNumber.value)){
        return alert("Не вірна кредитна картка");
    }

    let gotCvv = /^\d{3}$/ ;
    if(!gotCvv.test(cvv.value)){
        return alert("Не вірний cvv");
    }

    let foundAmount = finesData.find(function(itemObject){
        return itemObject["номер"] === fineNumber.value && itemObject["сума"] === Number(amount.value) ;
    });
    if(!foundAmount){
        return alert("Сума не співпадає");
    }

    // let deletePayment = finesData.findIndex(payment => payment["номер"] == fineNumber.value);
    // finesData.slice(deletePayment,1);

    let deletePayment = finesData.findIndex(function(itemObject){
        return itemObject["номер"] === fineNumber.value;
    })

    finesData.splice(deletePayment,1);
    fineNumber.value = '';
    passport.value = '';
    creditCardNumber.value = '';
    cvv.value = '';
    amount.value = '';
}

    
    
