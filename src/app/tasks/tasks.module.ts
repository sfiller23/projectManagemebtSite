import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';



@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TasksComponent
  ]
})
export class TasksModule { }
