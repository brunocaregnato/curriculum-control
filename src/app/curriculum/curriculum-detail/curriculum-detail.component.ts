import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageAction, PoTableColumn, PoComboOption, PoNotificationService } from '@po-ui/ng-components';
import { Subjects } from 'src/app/subjects/subjects.model';
import { Curriculum } from '../curriculum.model';
import { CurriculumService } from '../curriculum.service';

@Component({
  selector: 'app-curriculum-detail',
  templateUrl: './curriculum-detail.component.html',
  styleUrls: ['./curriculum-detail.component.css']
})
export class CurriculumDetailComponent implements OnInit {

  public pageActions : Array<PoPageAction> = [
    { label: 'Voltar', action: this.back.bind(this), icon: 'po-icon po-icon-exit' }  
  ];

  public curriculum: Curriculum;
  public columns: Array<PoTableColumn>;
  
  public subjectsList: Array<Subjects>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _curriculumService: CurriculumService,) { }

  public ngOnInit(): void {    
    this.setColumns();
    this.setSubjectsList();
    this.curriculum = new Curriculum();
    //this._curriculumService.getId(this._activatedRoute.snapshot.params.id)
    //  .then((curriculum: Curriculum) => this.curriculum = curriculum);

    let obj: Curriculum = new Curriculum();
    obj.id = 1;
    obj.name = 'CURRÍCULO 1';
    let subjects: Array<Subjects> = new Array<Subjects>();
    let subject = new Subjects();
    subject.id = 1;
    subject.name = 'TESTE 1';
    subjects[0] = subject;
    subject = new Subjects();
    subject.id = 2;
    subject.name = 'TESTE 2';
    subjects[1] = subject;      
    subject = new Subjects();
    subject.id = 3;
    subject.name = 'TESTE 3';
    subjects[2] = subject;
    obj.subjects = subjects;
    this.curriculum = obj;    
  }

  private setColumns() : void {
    this.columns = [
      { property: 'id', label: 'Código' },
      { property: 'name', label: 'Disciplina' }
    ];    
  }

  private setSubjectsList() : void {
    let obj1 = new Subjects();
    obj1.id = 1;
    obj1.name = 'TESTE 1';
    let obj2 = new Subjects();
    obj2.id = 2;
    obj2.name = 'TESTE 2';
    let obj3 = new Subjects();
    obj3.id = 3;
    obj3.name = 'TESTE 3';

    this.subjectsList = [];
    [obj1, obj2, obj3].forEach(
      subject => this.subjectsList.push(subject));
  }

  private back() : void {
    this._router.navigate(['curriculum']);
  }

}
