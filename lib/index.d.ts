declare const DOMDay: HTMLElement;
declare const DOMWeekDay: HTMLElement;
declare const DOMMonth: HTMLElement;
declare const DOMInput: HTMLInputElement;
declare const DOMList: HTMLElement;
declare const DOMButton: HTMLButtonElement;
declare let a: number;
declare function remInput(): string;
declare function addTask(): void;
declare function getOutput(event: Event): void;
declare function speaker(p_output: any): void;
declare function check(event: Event): void;
declare function removeTask(event: Event): void;
interface ITimer {
    stop: number;
    hour: number;
    min: number;
    sec: number;
}
declare let newTimer: ITimer;
declare let id: string;
declare let idArray: Array<String>;
declare function pause(event: Event): void;
declare function start(event: Event): string;
declare function styleTag(p_DOMStart: HTMLElement, p_DOMPause: HTMLElement): void;
declare function styleTagReverse(p_DOMPause: HTMLElement, p_DOMStart: HTMLElement): void;
declare function setTime(p_DOMTimer: HTMLElement): void;
declare function timer(): void;
declare function clearHTML(p_id: string): void;
declare function insertHTML(p_id: string): void;
