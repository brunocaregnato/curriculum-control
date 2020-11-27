import { Curriculum } from '../curriculum/curriculum.model';

export class Students {
    public id: number;
    public name: string;
    public curriculum: Curriculum;
    public $actions: Array<string>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.curriculum = new Curriculum();
        this.$actions = [];
    }

    get $curriculum() {
        return this.curriculum.id.toString().concat(' - ').concat(this.curriculum.name);
    }
}