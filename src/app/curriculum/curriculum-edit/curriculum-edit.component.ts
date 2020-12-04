import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoComboOption, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subjects } from 'src/app/subjects/subjects.model';
import { SubjectsService } from 'src/app/subjects/subjects.service';
import { Curriculum } from '../curriculum.model';
import { CurriculumService } from '../curriculum.service';

@Component({
  selector: 'app-curriculum-edit',
  templateUrl: './curriculum-edit.component.html',
  styleUrls: ['./curriculum-edit.component.css']
})
export class CurriculumEditComponent implements OnInit {

  public pageActions : Array<PoPageAction> = [
    { label: 'Adicionar', action: this.save.bind(this), icon: 'po-icon po-icon-plus'},
    { label: 'Voltar', action: this.back.bind(this) }
  ];

  public curriculum: Curriculum;
  public columns: Array<PoTableColumn>;
  public subjects: Array<PoComboOption>;
  public subjectsList: Array<Subjects>;
  public comboValue: string;
  public isNew: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _subjectService: SubjectsService,
    private _curriculumService: CurriculumService,
    private _notification: PoNotificationService) { }

  public ngOnInit(): void {
    this.setColumns();
    this.setDisciplinesOptions();
    this.curriculum = new Curriculum();
    this.isNew = true;
    const id = this._activatedRoute.snapshot.queryParams.id;
    if (id) {
      this._curriculumService.getId(id).then((curriculum: Curriculum) => {
        this.curriculum = curriculum;
        this.setSubjectsList(this.curriculum.subjects);
      });
      this.isNew = false;
    }
  }

  private setColumns() : void {
    this.columns = [
      { property: 'code', label: 'Código' },
      { property: 'name', label: 'Disciplina' },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];
  }

  private setDisciplinesOptions() {
    this.subjects = [];
    this._subjectService.get().then(result => {
        result.forEach(element => {
          this.subjects.push({value: element.id, label: element.name});
        });
    });
  }

  private save() : void {
    if(this.isNew){
      this._curriculumService.post(this.curriculum).then(
        () => {
          this._notification.success('Currículo incluído com sucesso.')
          this.back();
        }
      ).catch(() => this._notification.error('Erro ao tentar incluir currículo.'));
    }else{
      this._curriculumService.put(this.curriculum).then(
        () => {
          this._notification.success('Currículo alterado com sucesso.')
          this.back();
        }
      ).catch(() => this._notification.error('Erro ao tentar alterar currículo.'));
    }

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
