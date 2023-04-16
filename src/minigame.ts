export const MIN = 0;
export const MAX = 100;
export const DEFAULT = 50;

const TICK_SPEED = 10;

export class MiniGame {
    private rangeId: string;
    private raising: boolean = true;
    private power: number = DEFAULT;
    private input: HTMLInputElement;
    private intervalId: NodeJS.Timer;

    constructor(rangeId: string) {
        this.rangeId = rangeId;
    }

    start() {
        this.input = this.getInput();
        this.power = this.getRandomCurrent()
        this.input.value = this.power.toString();
        this.raising = this.getRandomRaising();
        this.intervalId = setInterval(this.tick.bind(this), TICK_SPEED);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    getPower(): number {
        return this.power / MAX;
    }

    getMinigameHtml(): string {
        return `<input id="${this.rangeId}" type="range" value="${DEFAULT}" min="${MIN}" max="${MAX}" />`;
    }

    private getRandomCurrent(): number {
        return Math.round(Math.random() * 100);
    }

    private getRandomRaising(): boolean {
        let r = Math.round(Math.random());
        return r == 1;
    }

    private tick(): void {
        if (this.raising) {
            this.power++;
        } else {
            this.power--;
        }

        if (this.power >= MAX) {
            this.raising = false;
        }

        if (this.power <= MIN) {
            this.raising = true;
        }

        this.input.value = this.power.toString();
    }

    private getInput(): HTMLInputElement {
        return document.querySelector(`#${this.rangeId}`);
    }
}