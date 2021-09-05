import { Component, Input, OnInit, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormService } from '../../services/form.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { Team } from '../../models/team.model';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleAddComponent } from './module-add/module-add.component';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleComponent implements OnInit {
  @Input('module') module: string;

  addForm: boolean = false;
  editForm: boolean = false;
  editButtonState: string = "";
  addButtonState: string = "";
  moduleInterface: string = "";

  constructor(private modalService: NgbModal, public dataService: DataService, private formService: FormService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.moduleInterface = this.module.substring(0, this.module.length - 1);
    this.moduleInterface[0].toUpperCase();
    this.addButtonState = `Add ${this.moduleInterface}`;
  }

  open(){
    const modalRef = this.modalService.open(ModuleAddComponent);
    modalRef.componentInstance.module = this.module;

  }

  delete(id: string){
    this.dataService.onDelete(this.module, id);
  }

  closeEditForm(){
    this.editForm = false;
    this.editButtonState = `edit ${this.moduleInterface}`;
  }

  edit(item: any, module: string){
    this.editForm = true;
    let form;
    switch(module) {
      case "users": {
         const user = new User(this.fb);
         form = user.form;
         break;
      }
      case "teams": {
        const team = new Team(this.fb);
        form = team.form;
        break;
      }
      case "projects": {
        const project = new Project(this.fb);
        form = project.form;
        break;
     }
      case "tasks": {
        const task = new Task(this.fb);
        form = task.form;
        break;
     }
      default: {
         //statements;
         break;
      }
    }

    this.formService.setForm(form, item, module);

  }

}
