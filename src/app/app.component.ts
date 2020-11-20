import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private _router: Router) { }

  public readonly menus: Array<PoMenuItem> = [
    { label: 'Início', action: this.onHomeClick.bind(this), icon: 'po-icon po-icon-home' },
    { label: 'Currículos', action: this.onCurriculumClick.bind(this), icon: 'po-icon po-icon-document-double' },
    { label: 'Alunos', action: this.onStudentsClick.bind(this), icon: 'po-icon po-icon-users' },
    { label: 'Disciplinas', action: this.onSubjectsClick.bind(this), icon: 'po-icon po-icon-grid' }
  ];

  ngOnInit(): void {
    this.onHomeClick(); 
  }
  
  private onCurriculumClick() : void {
    this._router.navigate(['curriculum']);
  }

  private onHomeClick() : void {
    this._router.navigate(['home']);
  }

  private onSubjectsClick() : void {
    this._router.navigate(['subjects']);
  }

  private onStudentsClick() : void {
    this._router.navigate(['students']);
  }

}
