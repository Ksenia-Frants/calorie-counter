export default class Result {
  constructor(element) {
    this.element = element;
    this.result = this.element.querySelector(".counter__result");
    this.caloriesNorm = this.result.querySelector("#calories-norm");
    this.caloriesMin = this.result.querySelector("#calories-minimal");
    this.caloriesMax = this.result.querySelector("#calories-maximal");
  }

  show(calories) {
    this.caloriesNorm.textContent = calories.norm;
    this.caloriesMin.textContent = calories.min;
    this.caloriesMax.textContent = calories.max;

    this.result.classList.remove("counter__result--hidden");
    this.result.scrollIntoView(true);
  }

  hide() {
    this.caloriesNorm.textContent = 0;
    this.caloriesMin.textContent = 0;
    this.caloriesMax.textContent = 0;

    this.result.classList.add("counter__result--hidden");
    this.element.scrollIntoView(true);
  }
}
