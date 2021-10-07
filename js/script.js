/** Variables to work with jobRole event handler */
const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
otherJob.hidden = true;


/**This function sets a focus on the name field by default.*/
function focusName () {
    const name = document.getElementById('name');
    name.focus();
}
focusName();

/** This event handler hide by default the 'Other job role' field. If the user selects "Other" in the "Job Role" drop down menu, the "Other job role" text field appears, and they can enter info into it. */
jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
       otherJob.hidden = false;
    } else {
        otherJob.hidden = true;
    }
});


/** Variables to work with designSelect event handler */
const designSelect = document.getElementById('design');
const color = document.getElementById('color');
color.disabled = true;
const colorSelect = document.getElementById('color').children;


/** This event handler disable by default the color menu, so the user shouldn’t be able to see or choose a color option until they have chosen a design. */
designSelect.addEventListener('change', e => {
    color.disabled = false;
    for (let i = 1; i < colorSelect.length; i++) {
        let eTarget = e.target.value;
        let dataTheme = colorSelect[i].getAttribute('data-theme');
        if (eTarget === dataTheme) {
            colorSelect[i].hidden = false;
            colorSelect[i].setAttribute('selected', true);
        } else {
            colorSelect[i].hidden = true;
            colorSelect[i].removeAttribute('selected');
        }
    }
});


/** Variables to work with activities event handler */
const activities = document.getElementById('activities');
const totalElement = document.getElementById('activities-cost');
let totalCost = 0;
let totalActivities= 0;


/** This event handler allows users to see in real time their total cost base on their selections, either they check or uncheck boxes.  */
activities.addEventListener('change', e => {
    const dataCost = +e.target.getAttribute('data-cost');
    const chekedBox = e.target;

    for (let i = 0; i < chekedBox.length; i++) {
        if (chekedBox.getAttribute('data-day-and-time') === chekedBox[i].getAttribute('data-day-and-time')) {
            if (chekedBox.checked) {
                chekedBox[i].disabled = true;
                chekedBox[i].parentNode.classList.add('disabled');
            } else if (!chekedBox.checked) {
                chekedBox[i].disabled = false;
                chekedBox[i].parentNode.classList.remove('disabled');
            }
        }
        chekedBox.parentElement.classList.remove('disable');
        chekedBox.disabled = false;
    }
    if (chekedBox.checked) {
        totalCost += dataCost;
        totalActivities += 1;
    } else {
        totalCost -= dataCost;
        totalActivities -= 1;
    }
    totalElement.innerHTML = `Total: $${totalCost}`;
});


/**Variables to work with payment's event listener */
const paymentElement = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.hidden = true;
bitcoin.hidden = true;
paymentElement[1].setAttribute('selected', true);


/**This event handler displays by default the most common payment method option while the other payment form sections should be hidden. 
 * When the payment method option is updated in the drop-down menu, the payment sections in the form will update accordingly.
*/
paymentElement.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        creditCard.hidden = true;
        bitcoin.hidden = true;
        paypal.hidden = false;
    } else if (e.target.value === 'bitcoin') {
        creditCard.hidden = true;
        bitcoin.hidden = false;
        paypal.hidden = true;
    } else {
        creditCard.hidden = false;
        bitcoin.hidden = true;
        paypal.hidden = true;
    }
});

/**Variables to work with 'Form Validation' event handler. */
const emailInput = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const formElement = document.querySelector('form');
const emailHint = document.getElementById('email-hint');
const activitiesBox = document.getElementById('activities-box');


/**Helper functions */
/**This functions test each required field and the validation requirements of each. */
function regexName () {
    const nameInput = nameField.value;
    const nameTest = /^[a-z]/i.test(nameInput);
    return nameTest;
}
function regexEmail () {
    const email = emailInput.value;
    const emailTest = /^[^@]+@[^@.]+\.com+$/i.test(email);
    return emailTest;
}
function regexCCard () {
    const cardInput = cardNumber.value;
    const cardTest = /^\d{13,16}$/.test(cardInput);
    return cardTest;
}
function regexZip () {
    const zipInput = zipCode.value;
    const zipTest = /^\d{5}$/.test(zipInput);
    return zipTest;
}
function regexCvv () {
    const cvvInput = cvv.value;
    const cvvTest = /^\d{3}$/.test(cvvInput);
    return cvvTest;
}
function activitiesValidator () {
    const activitiesSelected = totalCost > 0;
    return activitiesSelected;
}

/**Add accessibility */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i =0; i < checkboxes.length; i++) {
    
    checkboxes[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });
    checkboxes[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}

/**This function handles error validation */
function errorValidation(test, element, event) {
    if(!test()) {
        event.preventDefault();
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.classList.remove('hint');
    } else {
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('not-valid');
        element.parentElement.lastElementChild.classList.add('hint');
    }
}


/** This event handler validates each required form field or section when the form submission is detected. 
 * Checks to ensure that they have been filled out correctly. If any of the following required fields is not valid, the form’s submission should be prevented.*/
formElement.addEventListener('submit', (e) => {
    errorValidation(regexName, nameField, e);
    errorValidation(regexEmail, emailInput, e);
    errorValidation(activitiesValidator,activities.firstElementChild, e);

    const ccInfo = document.getElementById('credit-card');
    if (ccInfo.style.display === '') {
        errorValidation(regexCCard, cardNumber, e);
        errorValidation(regexZip, zipCode, e);
        errorValidation(regexCvv,cvv, e);
    }
});