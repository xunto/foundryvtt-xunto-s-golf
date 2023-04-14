export const MIN = 0;
export const MAX = 100;
export const DEFAULT = 50;

const TICK_SPEED = 1;

export class MiniGame {
    private rangeId: string;
    private raising: boolean = true;
    private current: number = DEFAULT;
    private input: HTMLInputElement;
    private intervalId: NodeJS.Timer;

    constructor(rangeId: string) {
        this.rangeId = rangeId;
    }

    start() {
        this.input = this.getInput();
        this.intervalId = setInterval(this.tick.bind(this), TICK_SPEED);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    getResult(): number {
        return this.current;
    }

    tick() {
        if (this.raising) {
            this.current++;
        } else {
            this.current--;
        }

        if (this.current >= MAX) {
            this.raising = false;
        }

        if (this.current <= MIN) {
            this.raising = true;
        }

        this.input.value = this.current.toString();
    }

    private getInput(): HTMLInputElement {
        return document.querySelector(`#${this.rangeId}`);
    }
}