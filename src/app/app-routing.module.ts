import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumDetailComponent } from './curriculum/curriculum-detail/curriculum-detail.component';
import { CurriculumEditComponent } from './curriculum/curriculum-edit/curriculum-edit.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'curriculum/edit', component: CurriculumEditComponent },
  { path: 'curriculum/detail/:id', component: CurriculumDetailComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'students', component: StudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
