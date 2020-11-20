import { Subjects } from '../subjects/subjects.model';

export class Curriculum {
    public id: number;
    public name: string;
    public subjects: Array<Subjects>
    public $actions: Array<string>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.subjects = [];
        this.$actions = [];
    }
}
