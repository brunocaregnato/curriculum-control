import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PoDialogService, PoNotificationService, PoPageAction,  PoTableColumn } from '@po-ui/ng-components';
import { Curriculum } from './curriculum.model';
import { CurriculumService } from './curriculum.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  public pageActions : Array<PoPageAction> = [
    { label: 'Adicionar', action: this.add.bind(this), icon: 'po-icon po-icon-plus'}
  ];

  public columns: Array<PoTableColumn>;
  public columActions: Array<string> = ['edit', 'delete'];
  public items: Array<Curriculum>;

  constructor(
    private _router: Router,
    private _curriculumService: CurriculumService,
    private _dialog: PoDialogService,
    private _notification: PoNotificationService) { }

  public ngOnInit(): void {
    this.setColumns();
    this.get();
  }

  private setColumns() : void {
    this.columns = [
      { property: 'code', label: 'Código', type: 'link', action: (value, object) => {
        this.detail(object.id);
      } },
      { property: 'name', label: 'Currículo' },
      { property: '$actions', label: 'Ações', type: 'icon', icons: [
        { value: 'edit', icon: 'po-icon-edit', color: 'color-01', action: this.edit.bind(this) },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-07', action: this.delete.bind(this) },
      ]}
    ];
  }

  private get() : void {
    this._curriculumService.get().then(result => {
        this.setData(result);
    });
  }

  private setData(result: Array<Curriculum>) : void {
    this.items = new Array<Curriculum>();
    result.forEach(item => {
      item.$actions = ['edit', 'delete'];
      this.items.push(item);
    });
  }

  private add() : void {
    this._router.navigate(['curriculum/edit']);
  }

  private edit(curriculum: Curriculum) : void {
    this._router.navigate(['curriculum/edit'], { queryParams: { id: curriculum.id } });
  }

  private delete(curriculum: Curriculum) : void {
    this._dialog.confirm({
      title: 'Remover',
      message: 'Confirma a remoção do currículo?',
      confirm: () => {
        this._curriculumService.delete(curriculum.id).then(() => {
          this._notification.success('Currículo removido com sucesso.');
          this.get();
        })
        .catch(() => this._notification.error('Erro ao remover o currículo.'));
      }
    });
  }

  private detail(id: string) {
    return this._router.navigate(['curriculum/detail/'+id]);
  }
}
