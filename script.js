//  defining elements
const billInput = document.getElementById('bill-input');
const tipOption = document.querySelectorAll('.tip-option');
const noOfPeople = document.getElementById('number-of-people');
const customTipOption = document.querySelector('.custom');
const resetTip = document.querySelector('.reset-tip');

// tip Inputs needed tocompute the overall tip and divided tip.
const tipInputs = {
    billAmount: 14.55,
    tipPercentage: 15,
    people: 0
};
console.log(tipInputs);

// ================= calculator inputs ======================
billInput.addEventListener('input', function() {
    tipInputs.billAmount = billInput.value;
    computeTip();
});

tipOption.forEach(tip => {
    tip.addEventListener('click', function() {
        tipInputs.tipPercentage = tip.value / 100;
        computeTip();
    })
})

customTipOption.addEventListener('input', function() {
    tipInputs.tipPercentage = customTipOption.value / 100;
    computeTip();
})

noOfPeople.addEventListener('input', function() {
    const error = document.querySelector('.error');
    
    
    if (noOfPeople.value <= 0) {
        console.log(noOfPeople.value);
        noOfPeople.style.outline = '3px solid tomato';
        error.style.opacity = 1;
    } else {
        noOfPeople.style.outline = 'none';
        error.style.opacity = 0;
    }
    tipInputs.people = noOfPeople.value;
    computeTip();
})

resetTip.addEventListener('click', function () {
    tipInputs.billAmount = 0;
    tipInputs.tipPercentage = 0;
    tipInputs.people = 0;
    // unchecked the radio buttons/ ti[ options]
    tipOption.forEach(tip => {
        tip.checked = false;
    })
    computeTip();
})


//  ==================calculator calculations =================

// compute tip 
function computeTip() {
    // destructuring the objectsfor more convenience.
    let tipAmount = 0;
    let total = 0;
    const {billAmount, tipPercentage, people} = tipInputs;

    if (billAmount > 0 && tipPercentage > 0 && people > 0) {
        tipAmount = (billAmount * tipPercentage) / people; 
        total = (billAmount * (tipPercentage + 1)) / people; 
        console.log(tipAmount, total);

        tipAmount = Math.round(tipAmount * 100) / 100;
        total = Math.round(total * 100) / 100;
        console.log(tipAmount, total);      
    } else {
        tipAmount = 0;
        total = 0;
    }
    
    updateCalculator(tipAmount, total);
}

//  update the calculator every input of user
function updateCalculator(tipAmount, total) {
    const tipAmountResult = document.querySelector('.tip-amount-result');
    const tipTotalResult = document.querySelector('.tip-total-result');

    tipAmountResult.textContent = `$${tipAmount.toFixed(2)}`;
    tipTotalResult.textContent = `$${total.toFixed(2)}`;
}

