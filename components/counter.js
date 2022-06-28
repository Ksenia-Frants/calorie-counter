import {
  activityCoefficient,
  formulaOptions,
  formulaSexOptions,
  caloriesMinMaxOptions,
} from "../utils/constants.js";

import Result from "./Result.js";

export default class Counter {
  constructor(element) {
    this.element = element;
    this.form = this.element.querySelector(".counter__form");
    this.inputs = this.form.getElementsByTagName("input");
    this.submit = this.form.querySelector(".form__submit-button");
    this.reset = this.form.querySelector(".form__reset-button");
    this.gender = this.form.elements.gender;
    // this.genderMale = this.form.querySelector("#gender-male");
    // this.genderFemale = this.form.querySelector("#gender-female");
    this.age = this.form.querySelector("#age");
    this.weight = this.form.querySelector("#weight");
    this.height = this.form.querySelector("#height");
    this.activity = this.form.querySelector("#activity-minimal");

    this.inputsArr = Array.from(this.inputs);

    this.result = new Result(this.element);
  }

  _onFormInput = () => {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.inputsArr.some((input) => input.value);
  };

  _onFormReset = () => {
    this.reset.disabled = true;
    this.submit.disabled = true;
    this.result.hide();
  };

  _onFormSubmit = (evt) => {
    evt.preventDefault();

    const caloriesData = {
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax(),
    };

    this.result.show(caloriesData);
  };

  init() {
    this.form.addEventListener("input", this._onFormInput);
    this.form.addEventListener("reset", this._onFormReset);
    this.form.addEventListener("submit", this._onFormSubmit);
  }

  deinit() {
    this.form.removeEventListener("input", this._onFormInput);
    this.form.removeEventListener("reset", this._onFormReset);
    this.form.removeEventListener("submit", this._onFormSubmit);
  }

  getCaloriesNorm() {
    const age = formulaOptions.age * this.age.value;
    const weight = formulaOptions.weight * this.weight.value;
    const height = formulaOptions.height * this.height.value;
    const gender = formulaSexOptions[this.gender.value];
    const activity = activityCoefficient[this.activity.value];

    return Math.round((weight + height - age - gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * caloriesMinMaxOptions.min);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * caloriesMinMaxOptions.max);
  }
}
