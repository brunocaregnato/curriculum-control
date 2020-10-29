import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'curriculum', component: CurriculumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
