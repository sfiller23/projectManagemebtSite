import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { UsersResolver } from '../shared/resolvers/users.resolver';
import { TasksResolver } from '../shared/resolvers/tasks.resolver';
import { ProjectsResolver } from '../shared/resolvers/projects.resolver';
import { TeamsResolver } from '../shared/resolvers/teams.resolver';

const routes: Routes = [
  {path: '',
    component: OverviewComponent,
    resolve:{
      users: UsersResolver,
      tasks: TasksResolver,
      projects: ProjectsResolver,
      teams: TeamsResolver,
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
