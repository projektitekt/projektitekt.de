import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class BingoGrid extends Component {
  @service confetti;
  @service fastboot;

  @tracked textVisible = false;

  @tracked order = shuffle([
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
  ]);

  @tracked state = [
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
  ];

  get hasBingo() {
    let { state } = this;

    for (let row = 0; row < 4; row++) {
      if (
        state[row * 4] &&
        state[row * 4 + 1] &&
        state[row * 4 + 2] &&
        state[row * 4 + 3]
      ) {
        return true;
      }
    }

    for (let column = 0; column < 4; column++) {
      if (
        state[column] &&
        state[column + 4] &&
        state[column + 2 * 4] &&
        state[column + 3 * 4]
      ) {
        return true;
      }
    }

    if (state[0] && state[5] && state[10] && state[15]) {
      return true;
    }

    if (state[3] && state[6] && state[9] && state[12]) {
      return true;
    }

    return false;
  }

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.confetti.load();
      setTimeout(() => {
        if (!this.isDestroying && !this.isDestroyed) {
          this.textVisible = true;
        }
      }, 0);
    }
  }

  @action toggle(index) {
    let state = [...this.state];
    state[index] = !state[index];
    this.state = state;
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
