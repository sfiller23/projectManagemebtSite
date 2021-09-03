import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, AfterContentInit, AfterViewInit, ElementRef, QueryList, ContentChildren, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { DataService } from '../../services/data.service';
import { GeneralService } from '../../services/general.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css']
})
export class ModuleDetailsComponent implements OnInit, AfterViewInit {
  @Input('module') module: string;
  @Output('done') done: EventEmitter<string> = new EventEmitter<'done'>();
  @ViewChildren('roleOption') roleOptiones: QueryList<ElementRef>;
  @ViewChildren('editFormElement') editFormElement: QueryList<ElementRef>;
  @Output('autoCheckBox') autoCheckBox: EventEmitter<string> = new EventEmitter<'autoCheckBox'>();
  inputValue: any;
  item: any;

  editForm: FormGroup;

  constructor(private ref: ElementRef ,public renderer: Renderer2 ,private formService: FormService, public dataService: DataService, private generalService: GeneralService) {
    this.formService.renderer = this.renderer;
  }

  ngOnInit(): void {
    if(!this.item){

      this.item = this.formService.currentItem;

      if(!this.editForm){

        this.formService.form$.pipe(first()).subscribe(form=>{
          this.editForm = form;

          this.autoSetInputs();


        })

      }
    }

  }

  ngAfterViewInit(){

    switch(this.module){
      case 'users':
        const role: string = this.item.role;
        const selectedRoleEl = this.roleOptiones.filter(item=>item.nativeElement.value==role);
        this.renderer.setAttribute(selectedRoleEl[0].nativeElement,'selected', 'true');
        break;
      case 'teams':
        const teamMembers: string[] = this.item.members;
        break;
      default:
        //do nonthing
        break;
    }

    const formDivs = this.editFormElement.first.nativeElement.children;

    this.formService.toggleSaveButton(formDivs);

  }

  autoCheck(input: HTMLInputElement, id: string){

    switch(this.module){
      case 'teams':
        this.formService.setCheckBoxes(input, id, this.item.members);
        this.formService.setCheckBoxes(input, id, this.item.projects);
        break;
      case 'projects':
        this.formService.setCheckBoxes(input, id, this.item.tasks);
        break;
      default:
        ///
        break;
    }

  }

  private autoSetInputs(){
    this.formService.setInputs(this.editForm, this.item.id, this.module);
  }


  onDone(){
    this.done.emit();
  }

  onToggleBox(label: HTMLLabelElement, input: HTMLInputElement, id: string){
    let inputValue;
    switch(input.value) {
      case "projects": {
        inputValue = this.editForm.value.projects
        break;
     }
      case "members": {
        inputValue = this.editForm.value.members
        break;
      }
      case "tasks": {
        inputValue = this.editForm.value.tasks
        break;
     }
      default: {
         //statements;
        break;
      }
   }
    this.formService.toggleBox(label, input, id, this.editForm, inputValue);
  }


}
