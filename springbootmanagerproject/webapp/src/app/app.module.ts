import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { FormsModule } from '@angular/forms';
import { TaskComponentComponent } from './task-component/task-component.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponentComponent } from './user-component/user-component.component';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task-component/task-component.service';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, MatSortable, MatTableDataSource, MatDialog} from '@angular/material';



const routeLists : Routes = [
{path:"", component:UserComponentComponent},
	{path:"view", component:MainComponentComponent},
		{path:"task", component:TaskComponentComponent},
		{path:"project", component:ProjectComponentComponent}
	]
@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    TaskComponentComponent,
    UserComponentComponent,
    ProjectComponentComponent,
	
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
  MatListModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
	HttpClientModule,
  BrowserAnimationsModule,
  MatTableModule,
  MatSortModule,
  Ng5SliderModule,
  MatIconModule,
  NgbModule,
	RouterModule.forRoot(routeLists)
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
