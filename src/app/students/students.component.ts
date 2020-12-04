import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalComponent, PoPageAction, PoModalAction, PoTableColumn, PoNotificationService, PoDialogService, PoComboOption } from '@po-ui/ng-components';
import { Curriculum } from '../curriculum/curriculum.model';
import { CurriculumService } from '../curriculum/curriculum.service';
import { Subjects } from '../subjects/subjects.model';
import { Students } from './students.model';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) modal: PoModalComponent;

  public pageActions : Array<PoPageAction> = [
    { label: 'Adicionar', action: this.addModal.bind(this), icon: 'po-icon po-icon-plus'}
  ];

  public confirm: PoModalAction = {
    label: 'Confirmar', action: () => this.confirmAction()
  }

  public cancel: PoModalAction = {
    label: 'Cancelar', action: () => { this.modal.close() }
  }

  public columns: Array<PoTableColumn>;
  public columActions: Array<string> = ['edit', 'delete'];
  public items: Array<Students>;
  public modalTitle: string = '';
  public isNew: boolean = false;
  public student: Students = new Students();
  public comboValue: string;

  public curriculums: Array<PoComboOption>;
  public curriculumsList: Array<Curriculum>;

  constructor(
    private _router: Router,
    private _studentService: StudentsService,
    private _curriculumService: CurriculumService,
    private _notification: PoNotificationService,
    private _dialog: PoDialogService) { }

  public ngOnInit() : void {
    this.initColumns();
    this.setCurriculumsOption();
    this.get();
  }

  private initColumns() : void {
    this.columns = [
      { property: 'id', label: 'Código' },
      { property: 'name', label: 'Disciplina' },
      { property: '$curriculum', label: 'Currículo', type: 'link', action: this.detail.bind(this) },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'edit', icon: 'po-icon-edit', color: 'color-01', action: this.editModal.bind(this) },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];
  }

  private get() : void {
    //this._studentService.get().then(result => {
    //    this.setData(result);
    //});

    let obj1 = new Students();
    obj1.id = 1;
    obj1.name = 'ALUNO 1';
    let curriculum: Curriculum = new Curriculum();
    curriculum.id = 1;
    curriculum.name = 'CURRÍCULO 1';
    obj1.curriculum = curriculum;
    let obj2 = new Students();
    curriculum = new Curriculum();
    curriculum.id = 2;
    curriculum.name = 'CURRÍCULO 2';
    obj2.curriculum = curriculum;
    obj2.id = 2;
    obj2.name = 'ALUNO 2';
    let obj3 = new Students();
    curriculum = new Curriculum();
    curriculum.id = 3;
    curriculum.name = 'CURRÍCULO 3';
    obj3.id = 3;
    obj3.name = 'ALUNO 3';
    obj3.curriculum = curriculum;

    let array = [obj1, obj2, obj3];
    this.setData(array);
  }

  private setCurriculumsOption() {
    this.curriculums = [];
    //this._curriculumService.get().then(result => {
    //    this.curriculums.push({value: result.id, label: result.name})
    //    this.curriculumsList.push(result);
    //});

    this.curriculums.push({value: 1, label: 'CURRÍCULO 1'});
    this.curriculums.push({value: 2, label: 'CURRÍCULO 2'});
    this.curriculums.push({value: 3, label: 'CURRÍCULO 3'});

    let curriculum = new Curriculum();
    curriculum.id = 1;
    curriculum.name = 'CURRÍCULO 1';
    let curriculum2 = new Curriculum();
    curriculum2.id = 2;
    curriculum2.name = 'CURRÍCULO 2';
    let curriculum3 = new Curriculum();
    curriculum3.id = 3;
    curriculum3.name = 'CURRÍCULO 3';

    this.setCurriculumsList([curriculum, curriculum2, curriculum3]);

  }

  private setCurriculumsList(curriculums: Array<Curriculum>) : void {
    this.curriculumsList = [];
    curriculums.forEach(curriculum => this.curriculumsList.push(curriculum));
  }

  private add(student: Students) : void {
    this._studentService.post(student).then(() => {
      this._notification.success('Aluno incluído com sucesso.');
      this.get();
    })
    .catch(() => this._notification.error('Erro ao incluir o aluno.'));
  }

  private edit(student: Students) : void {
    this._studentService.put(student).then(() => {
      this._notification.success('Aluno editado com sucesso.');
      this.get();
    })
    .catch(() => this._notification.error('Erro ao editar o aluno.'));
  }

  private delete(student: Students) : void {
    this._dialog.confirm({
      title: 'Remover',
      message: 'Confirma a remoção do aluno?',
      confirm: () => {
        this._studentService.delete(student.id).then(() => {
          this._notification.success('Aluno removido com sucesso.');
          this.get();
        })
        .catch(() => this._notification.error('Erro ao remover o aluno.'));
      }
    });
  }

  private setData(result: Array<Students>) : void {
    this.items = new Array<Students>();
    result.forEach(item => {
      item.$actions = ['edit', 'delete'];
      this.items.push(item);
    });
  }

  private confirmAction() : void {
    if (this.isNew)
      this.add(this.student);
    else
      this.edit(this.student);

    this.modal.close();
  }

  private addModal() : void {
    this.modalTitle = 'Adicionar';
    this.student = new Students();
    this.comboValue = 0;
    this.isNew = true;
    this.modal.open();
  }

  private editModal(student: Students) : void {
    this.modalTitle = 'Editar';
    Object.assign(this.student, student);
    this.comboValue = student.curriculum.id;
    this.isNew = false;
    this.modal.open();
  }

  public changeCurriculum() : void {
    this.student.curriculum = this.curriculumsList.find(x => x.id == this.comboValue);
  }

  private detail(id: string) : void {
    this._router.navigate(['curriculum/detail/'.concat(id.substring(0,1))]);
  }
}
