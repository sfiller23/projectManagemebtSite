import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamAddComponent } from './team-add/team-add.component';



@NgModule({
  declarations: [
    TeamsComponent,
    TeamAddComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TeamsComponent
  ]
})
export class TeamsModule { }
