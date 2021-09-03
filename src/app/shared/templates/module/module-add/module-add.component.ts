import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/shared/models/project.model';
import { Task } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { FormService } from 'src/app/shared/services/form.service';
import { DataService } from '../../../services/data.service';
import { Team } from '../../../models/team.model';

@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css']
})
export class ModuleAddComponent implements OnInit {
  @Input('module') module: string;
  @Output('submited') submited: EventEmitter<string> = new EventEmitter<'submited'>();

  addForm: FormGroup;

  constructor(private formService: FormService, private fb: FormBuilder, public dataService: DataService) { }

  ngOnInit(): void {
    switch(this.module) {
      case "users": {
         const user = new User(this.fb);
         this.addForm = user.form;
         break;
      }
      case "teams": {
        const team = new Team(this.fb);
        this.addForm = team.form;
         break;
      }
      case "projects": {
        const project = new Project(this.fb);
        this.addForm = project.form;
        break;
     }
      case "tasks": {
        const task = new Task(this.fb);
        this.addForm = task.form;
        break;
     }
      default: {
         //statements;
         break;
      }
   }
  }

  onSubmit(){
    console.log(this.addForm.value);
    this.dataService.addData(this.addForm.value, this.module);
    this.addForm.reset();
    this.submited.emit();
  }

  onToggleBox(label: HTMLLabelElement, input: HTMLInputElement, id: string){
    let inputValue;
    switch(input.value) {
      case "projects": {
        inputValue = this.addForm.value.projects
        break;
     }
      case "members": {
        inputValue = this.addForm.value.members
        break;
      }
      case "tasks": {
        inputValue = this.addForm.value.tasks
        break;
     }
      default: {
         //statements;
        break;
      }
   }
    this.formService.toggleBox(label, input, id, this.addForm, inputValue);
  }

}
