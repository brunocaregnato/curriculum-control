import { Curriculum } from '../curriculum/curriculum.model';

export class Students {
    public id: string;
    public name: string;
    public curriculum: Curriculum;
    public $actions: Array<string>;

    constructor() {
        this.id = '';
        this.name = '';
        this.curriculum = new Curriculum();
        this.$actions = [];
    }

    get $curriculum() {
        return this.curriculum.name;
    }
}
