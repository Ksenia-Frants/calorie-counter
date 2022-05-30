import {
  activityCoefficient,
  formulaOptions,
  formulaSexOptions,
  caloriesMinMaxOptions,
} from "../utils/constants.js";

export default class Counter {
  constructor(element) {
    this.element = element;
    this.form = this.element.querySelector(".counter__form");
    this.formElements = this.form.elements;
    this.formElementsParameters = this.formElements.parameters.elements;
    this.submit = this.formElements.submit;
    this.reset = this.formElements.reset;
    this.gender = this.formElements.gender;
    this.age = this.formElements.age;
    this.weight = this.formElements.weight;
    this.height = this.formElements.height;
    this.activity = this.formElements.activity;

    this.parametersItems = Array.from(this.formElementsParameters);
  }

  _onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersItems.some((elem) => elem.value);
  }

  _onFormReset() {
    this.reset.disabled = true;
    this.submit.disabled = true;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesData = {
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax(),
    };

    this.result.show(caloriesData);
  }

  getCaloriesNorm() {
    const age = formulaOptions.age * this.age.value;
    const weight = formulaOptions.weight * this.weight.value;
    const height = formulaOptions.height * this.height.value;
    const gender = this.formulaSexOptions[this.gender.value];
    const activity = this.activityCoefficient[this.activity.value];

    return (weight + height - age - gender) * activity;
  }

  getCaloriesMin() {
    return this.getCaloriesNorm() * caloriesMinMaxOptions.min;
  }

  getCaloriesMax() {
    return this.getCaloriesNorm() * caloriesMinMaxOptions.max;
  }
}
