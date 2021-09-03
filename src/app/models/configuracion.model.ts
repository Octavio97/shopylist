import { Datos } from "./datos.model";
import { Idioma } from "./idioma.model";
import { Dinero } from './dinero.model';
import { Dimensiones } from './dimensiones.model';

export class Configuracion {
    settingsId: number;
    name: string;
    image: string;
    value?: boolean;
    data?: Datos[];
    languages?: Idioma[];
    money?: Dinero[];
    dimensions?: Dimensiones[];

    constructor () {}
}