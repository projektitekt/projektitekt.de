import Helper from '@ember/component/helper';
import { inject as service } from "@ember/service";

var colors = ['#203864', '#8faadc', '#d1dbed'];

export default class Substring extends Helper {
  @service confetti;

  compute() {
    this.schedule();
  }

  schedule() {
    this.token = window.requestAnimationFrame(() => {
      this.fire();
      this.schedule();
    });
  }

  fire() {
    this.confetti.fire({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    this.confetti.fire({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
  }

  willDestroy() {
    if (this.token) {
      window.cancelAnimationFrame(this.token);
    }
  }
}
