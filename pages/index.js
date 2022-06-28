import Counter from "../components/Counter.js";

const counterElement = document.querySelector(".counter");

const counter = new Counter(counterElement);
counter.init();
