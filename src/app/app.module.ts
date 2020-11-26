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
import { CurriculumAddComponent } from './curriculum/curriculum-add/curriculum-add.component';
import { CurriculumEditComponent } from './curriculum/curriculum-edit/curriculum-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CurriculumComponent,
    HomeComponent,
    StudentsComponent,
    SubjectsComponent,
    CurriculumAddComponent,
    CurriculumEditComponent    
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
