import { Alert } from "./alert.model";
import { IntroText } from './introTexts.model';

export class Page4 {
    pageId: number;
    name: string;
    confirmButton: string;
    cancelButton: string;
    saveButton: string;
    deleteButton: string;
    search: string;
    returnButton: string;
    noListLabel: string;
    alerts: Alert[];
    intro: IntroText[];

    constructor() {}
}