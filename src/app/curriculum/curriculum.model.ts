import { Subjects } from '../subjects/subjects.model';

export class Curriculum {
    public id: string;
    public code: string;
    public name: string;
    public subjects: Array<Subjects>
    public $actions: Array<string>;

    constructor() {
        this.id = '';
        this.code = '';
        this.name = '';
        this.subjects = [];
        this.$actions = [];
    }
}
