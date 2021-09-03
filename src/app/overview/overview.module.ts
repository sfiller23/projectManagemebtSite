import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { UsersModule } from '../users/users.module';
import { TeamsModule } from '../teams/teams.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersComponent } from '../users/users.component';
import { TeamsComponent } from '../teams/teams.component';
import { TasksComponent } from '../tasks/tasks.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OverviewComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    OverviewRoutingModule,
    SharedModule,

  ]
})
export class OverviewModule { }
