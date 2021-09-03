import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpService } from '../shared/services/http.service';



@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    UsersComponent
  ],
  providers:[

  ]

})
export class UsersModule { }
