import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { Subjects } from './subjects.model';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

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
  public items: Array<Subjects>;
  public modalTitle: string = '';
  public isNew: boolean = false;
  public subject: Subjects = new Subjects();

  constructor(
    private _subjectService: SubjectsService,
    private _notification: PoNotificationService,
    private _dialog: PoDialogService) { }

  public ngOnInit() : void {
    this.initColumns();
    this.get();
  }

  private initColumns() : void {
    this.columns = [
      { property: 'id', label: 'Código' },
      { property: 'name', label: 'Disciplina' },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'edit', icon: 'po-icon-edit', color: 'color-01', action: this.editModal.bind(this) },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];
  }

  private get() : void {
    //this._subjectService.get().then(result => {
    //    this.setData(result);
    //});
    
    let obj1 = new Subjects();
    obj1.id = 1;
    obj1.name = 'TESTE 1';
    let obj2 = new Subjects();
    obj2.id = 2;
    obj2.name = 'TESTE 2';
    let obj3 = new Subjects();
    obj3.id = 3;
    obj3.name = 'TESTE 3';
    let array = [obj1, obj2, obj3];
    this.setData(array);
  }

  private add(subject: Subjects) : void {
    this._subjectService.post(subject).then(() => {
      this._notification.success('Disciplina incluída com sucesso.');
      this.get();
    })
    .catch(() => this._notification.error('Erro ao incluir a disciplina.'));
  }

  private edit(subject: Subjects) : void {
    this._subjectService.put(subject).then(() => {
      this._notification.success('Disciplina editada com sucesso.');
      this.get();
    })
    .catch(() => this._notification.error('Erro ao editar a disciplina.'));
  }

  private delete(subject: Subjects) : void {
    this._dialog.confirm({
      title: 'Remover',
      message: 'Confirma a remoção da disciplina?',
      confirm: () => {
        this._subjectService.delete(subject.id).then(() => {
          this._notification.success('Disciplina removida com sucesso.');
          this.get();
        })
        .catch(() => this._notification.error('Erro ao remover a disciplina.'));
      }
    });    
  }

  private setData(result: Array<Subjects>) : void {
    this.items = new Array<Subjects>();
    result.forEach(item => {
      item.$actions = ['edit', 'delete'];
      this.items.push(item);
    });
  }

  private confirmAction() : void {
    if (this.isNew) 
      this.add(this.subject);
    else
      this.edit(this.subject);

    this.modal.close();    
  }

  private addModal() : void {
    this.modalTitle = 'Adicionar';
    this.subject = new Subjects();
    this.isNew = true;
    this.modal.open();
  }

  private editModal(subject: Subjects) : void {
    this.modalTitle = 'Editar';
    Object.assign(this.subject, subject);
    this.isNew = false;
    this.modal.open();
  }

}
