import { Datos } from "./datos.model";
import { Idioma } from "./idioma.model";

export class Configuracion {
    settingsId: number;
    name: string;
    image: string;
    value?: boolean;
    data?: Datos[];
    language?: Idioma[];

    constructor () {}
}