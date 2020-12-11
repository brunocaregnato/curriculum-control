import { Curriculum } from './../curriculum/curriculum.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoModalComponent, PoPageAction, PoModalAction, PoTableColumn, PoNotificationService, PoDialogService, PoComboOption } from '@po-ui/ng-components';
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
    this.setCurriculumsOption();
    this.get();
    this.initColumns();
  }

  private initColumns() : void {
    this.columns = [
      { property: 'name', label: 'Nome' },
      { property: '$curriculum', label: 'Currículo', type: 'link', action: (value, object) => {
        this.detail(object.curriculum.id);
      } },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'edit', icon: 'po-icon-edit', color: 'color-01', action: this.editModal.bind(this) },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];
  }

  private get() : void {
    this._studentService.get().then(result => {
        this.setData(result);
    });
  }

  private setCurriculumsOption() {
    this.curriculums = [];
    this.curriculumsList = [];
    this._curriculumService.get().then(result => {
        result.forEach(element => {
          this.curriculums.push({value: element.id, label: element.name});
          this.curriculumsList.push(element);
        });
    });
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
      item = Object.assign(new Students(), item);
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
    this.comboValue = '';
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
    this._router.navigate(['curriculum/detail/'.concat(id)]);
  }
}
