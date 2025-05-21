export default class Disk {
  constructor(config = {}) {
    this.index = config.index || 0;
    this.radius = config.radius;
    this.strokeAmount = config.strokeAmount;
  }
  createDisk() {
    const ellipse = document.createElement("div");
    ellipse.classList.add("ellipse");
    ellipse.style.width = this.radius + "px";
    ellipse.style.height = this.radius + "px";
    ellipse.append(...this.createStrokes(this.strokeAmount));
    return ellipse;
  }

  createStrokes(amount) {
    let strokes = [];

    for (let index = 0; index < amount; index++) {
      const deg = 360 / amount;
      console.log(deg);
      const stroke = document.createElement("span");
      stroke.classList.add("stroke");
      stroke.style.transform = `translateY(-50%) rotate(${deg * index}deg)`;
      strokes.push(stroke);
    }

    return strokes;
  }
}
