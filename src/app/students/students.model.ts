import { Curriculum } from '../curriculum/curriculum.model';

export class Students {
    public id: number;
    public name: string;
    public curriculum: Curriculum;
    public $actions: Array<string>;

    constructor() {
        this.id = 0;
        this.name = '';   
        this.$actions = [];     
    }
}