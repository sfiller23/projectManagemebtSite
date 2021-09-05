import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkHackComponent } from './cdk-hack/cdk-hack.component';

const routes: Routes = [
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
