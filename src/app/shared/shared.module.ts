import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from './templates/module/module.component';
import { ModuleAddComponent } from './templates/module/module-add/module-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleDetailsComponent } from './templates/module-details/module-details.component';
import { FormService } from './services/form.service';
import { AutoCheckBoxSetDirective } from './directives/auto-check-box-set.directive';



@NgModule({
  declarations: [
    ModuleComponent,
    ModuleAddComponent,
    ModuleDetailsComponent,
    AutoCheckBoxSetDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    ModuleComponent
  ],
  providers:[
    FormService,
  ]
})
export class SharedModule { }
