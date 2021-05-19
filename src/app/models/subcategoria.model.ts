import { Articulo } from './articulo.model';

export class Subcategoria {
    subId: number;
    name: string;
    image: string;
    articles: Articulo[];

    constructor() {}
}