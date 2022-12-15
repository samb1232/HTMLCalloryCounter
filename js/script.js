import { coefs, getNormCalories } from "./utils.js";

// Находим все поля в DOM
const form = document.querySelector('.counter__form');

const resultField = document.querySelector('.counter__result');

const age = form.querySelector('#age');
const weight = form.querySelector('#weight');
const height = form.querySelector('#height');
const gender = form.querySelector('input[name="gender"]:checked');

const activities = form.querySelectorAll('input[name="activity"]');
console.log(activities);

let CheckedActivity = form.querySelector('input[name="activity"]:checked');

const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');


const inputs = [].slice.call(document.querySelectorAll('input[type="text"]')); // set NodeList to Array

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        const empty = inputs.filter((element) => element.value.trim() === '').length;
        submitButton.disabled = empty !== 0;
    });

    // activate reset button
    input.addEventListener('input', () => {
        if (age.value.trim() !== 0 || height.value.trim() !== 0 || weight.value.trim() !== 0) {
            resetButton.disabled = false;
        }
    });
});

activities.forEach((activity) => {
     activity.addEventListener('input', (key, value) => {
        if (activity.checked) {
            CheckedActivity = activity;
            console.log(CheckedActivity);
        }
    });
});

// restore defaults
resetButton.addEventListener('click', () => {
    height.value = 0;
    weight.value = 0;
    age.value = 0;
    gender.value = 'male'
    CheckedActivity.value = 'min';
    form.activity.value = 'min';
    resetButton.disabled = true;
    submitButton.disabled = true;
    resultField.classList.add('counter__result--hidden');
});


submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    resultField.classList.remove('counter__result--hidden');

    const normCalories = getNormCalories(age.value, height.value, weight.value, 
        gender.value == 'female', coefs[CheckedActivity.value]).toFixed(2);
    resultField.querySelector('#calories-minimal').textContent  = (normCalories * 0.85).toFixed(2);
    resultField.querySelector('#calories-norm').textContent     = normCalories;
    resultField.querySelector('#calories-maximal').textContent  = (normCalories * 1.15).toFixed(2);
});