import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from './templates/module/module.component';
import { ModuleAddComponent } from './templates/module/module-add/module-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleDetailsComponent } from './templates/module-details/module-details.component';
import { FormService } from './services/form.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModuleComponent,
    ModuleAddComponent,
    ModuleDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    RouterModule,
  ],
  exports:[
    ModuleComponent,
    ModuleAddComponent,
  ],
  providers:[
    FormService,
  ]
})
export class SharedModule { }
