import { Subcategoria } from './subcategoria.model';

export class Categoria {
    catId: number;
    name: string;
    image: string;
    subcategories?: Subcategoria[];
    
    constructor() {}
}