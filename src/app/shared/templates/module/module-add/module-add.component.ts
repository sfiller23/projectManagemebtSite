import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/shared/models/project.model';
import { Task } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { FormService } from 'src/app/shared/services/form.service';
import { DataService } from '../../../services/data.service';
import { Team } from '../../../models/team.model';
import { GeneralService } from '../../../services/general.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css']
})
export class ModuleAddComponent implements OnInit {
  @Input('module') module: string;
  moduleId: string;


  addForm: FormGroup;

  constructor(private afs: AngularFirestore ,private router: Router,public activeModal: NgbActiveModal, public generalService: GeneralService,private formService: FormService, private fb: FormBuilder, public dataService: DataService) { }

  ngOnInit(): void {

    this.addForm = this.formService.initForm(this.module);
    this.moduleId = this.afs.createId();


  }

  onSubmit(){
    this.activeModal.close();
    console.log(this.addForm.value);
    this.dataService.addData(this.addForm.value, this.module, this.moduleId);
    this.addForm.reset();
    //location.reload();


  }

  onToggleBox(input: HTMLInputElement, id: string){
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
    this.formService.toggleBox(input, id, this.addForm, inputValue);
  }

}
