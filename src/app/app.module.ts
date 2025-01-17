import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectsService } from './subjects/subjects.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurriculumService } from './curriculum/curriculum.service';
import { CurriculumEditComponent } from './curriculum/curriculum-edit/curriculum-edit.component';
import { StudentsService } from './students/students.service';
import { CurriculumDetailComponent } from './curriculum/curriculum-detail/curriculum-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CurriculumComponent,
    HomeComponent,
    StudentsComponent,
    SubjectsComponent,
    CurriculumEditComponent,
    CurriculumDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [
    SubjectsService,
    CurriculumService,
    StudentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
