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
    this._curriculumService.getId(this._activatedRoute.snapshot.params.id)
     .then((curriculum: Curriculum) => this.curriculum = curriculum);
  }

  private setColumns() : void {
    this.columns = [
      { property: 'code', label: 'Código' },
      { property: 'name', label: 'Disciplina' }
    ];
  }

  private setSubjectsList() : void {
    this.subjectsList = [];
  }

  private back() : void {
    this._router.navigate(['curriculum']);
  }

}
