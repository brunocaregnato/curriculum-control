import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoComboOption, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subjects } from 'src/app/subjects/subjects.model';
import { SubjectsService } from 'src/app/subjects/subjects.service';
import { Curriculum } from '../curriculum.model';
import { CurriculumService } from '../curriculum.service';

@Component({
  selector: 'app-curriculum-add',
  templateUrl: './curriculum-add.component.html',
  styleUrls: ['./curriculum-add.component.css']
})
export class CurriculumAddComponent implements OnInit {

  public pageActions : Array<PoPageAction> = [
    { label: 'Adicionar', action: this.save.bind(this), icon: 'po-icon po-icon-plus'},
    { label: 'Voltar', action: this.back.bind(this) }  
  ];

  public curriculum: Curriculum;
  public columns: Array<PoTableColumn>;
  public subjects: Array<PoComboOption>;
  public subjectsList: Array<Subjects>;
  public comboValue: any;

  constructor(
    private _router: Router,
    private _subjectService: SubjectsService,
    private _curriculumService: CurriculumService,
    private _notification: PoNotificationService) { }

  public ngOnInit(): void {
    this.curriculum = new Curriculum();
    this.setColumns();
    this.setDisciplinesOptions();
  }

  private setColumns() : void {
    this.columns = [
      { property: 'id', label: 'Código' },
      { property: 'name', label: 'Disciplina' },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];    
  }

  private setDisciplinesOptions() {
    this.subjects = [];
    this.subjectsList = [];
    //this._subjectService.get().then(result => { 
    //    this.subjects.push({value: result.id, label: result.name})
    //    this.subjectsList.push(result);
    //});

    this.subjects.push({value: 1, label: 'TESTE 1'});
    this.subjects.push({value: 2, label: 'TESTE 2'});
    this.subjects.push({value: 3, label: 'TESTE 3'});
    let obj1 = new Subjects();
    obj1.id = 1;
    obj1.name = 'TESTE 1';
    let obj2 = new Subjects();
    obj2.id = 2;
    obj2.name = 'TESTE 2';
    let obj3 = new Subjects();
    obj3.id = 3;
    obj3.name = 'TESTE 3';
    this.setSubjectsList([obj1, obj2, obj3]);
  }

  private save() : void {
    this._curriculumService.post(this.curriculum).then(
      () => {
        this._notification.success('Currículo incluído com sucesso.')
        this.back();
      }
    ).catch(() => this._notification.error('Erro ao tentar incluir currículo.'));
  }

  public add() : void {
    this.curriculum.subjects.push(this.subjectsList.find(x => x.id == this.comboValue));
  }

  private setSubjectsList(subjects: Array<Subjects>) {
    this.subjectsList = [];
    subjects.forEach(subject => {
      subject.$actions = ['delete'];
      this.subjectsList.push(subject);
    });
  }

  private back() : void {
    this._router.navigate(['curriculum']);
  }

  private delete(subject: Subjects) : void {
    this.curriculum.subjects.splice(this.curriculum.subjects.indexOf(subject), 1);
  }

}
