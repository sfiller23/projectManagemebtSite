import { Injectable, EventEmitter, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formSubject = new BehaviorSubject<FormGroup>(null);
  form$: Observable<FormGroup> = this.formSubject.asObservable();

  currentModule: string;

  currentItem: any;

  renderer: Renderer2;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  private update(newValue: any, key: string){
    const APIitem = {
      [key]:newValue
    }

    this.dataService.updateData(APIitem, this.currentModule, this.currentItem.id).pipe(first()).subscribe();
  }


  setForm(form: FormGroup, item: any, module: string){
    this.currentModule = module;
    this.currentItem = item;
    this.formSubject.next(form);
  }

  setCheckBoxes(input: HTMLInputElement, id: string, itemArray: string[]){
    const currentItems = itemArray.includes(id);
    if(currentItems){
      this.renderer.setProperty(input, 'checked', 'true');
    }
  }

  setInputs(form: FormGroup, id: string, module: string){
    switch(module){
      case 'users':
        this.dataService.users$.pipe(map(users=>users.filter(user=>user.id==id))).subscribe(user=>{
          form.controls["firstName"].setValue(user[0].firstName);
          form.controls["lastName"].setValue(user[0].lastName);
          form.controls["email"].setValue(user[0].email);
          form.controls["phoneNumber"].setValue(user[0].phoneNumber);
          form.controls["role"].setValue(user[0].role);
        })
          break;
      case 'teams':
        this.dataService.teams$.pipe(map(teams=>teams.filter(team=>team.id==id))).subscribe(team=>{
          form.controls["name"].setValue(team[0].name);
          form.controls["description"].setValue(team[0].description);

        })
          break;
      case 'projects':
        this.dataService.projects$.pipe(map(projects=>projects.filter(project=>project.id==id))).subscribe(project=>{
          form.controls["name"].setValue(project[0].name);
          form.controls["description"].setValue(project[0].description);
          form.controls["startDate"].setValue(project[0].startDate);
          form.controls["endDate"].setValue(project[0].startDate);
          form.controls["state"].setValue(project[0].state);

        })
        break;

      case 'tasks':
        this.dataService.tasks$.pipe(map(tasks=>tasks.filter(task=>task.id==id))).subscribe(task=>{
          form.controls["name"].setValue(task[0].name);
          form.controls["description"].setValue(task[0].description);
          form.controls["startDate"].setValue(task[0].startDate);
          form.controls["startDate"].setValue(task[0].startDate);
          form.controls["state"].setValue(task[0].state);

        })
        break;

      default:

        break;

    }
  }

  toggleSaveButton(formDivs: any){

    let item: HTMLDivElement;

    for(item of formDivs){

      let inputs: HTMLCollectionOf<HTMLInputElement> = item.getElementsByTagName('input');

      let selects: HTMLCollectionOf<HTMLSelectElement> = item.getElementsByTagName('select');

      let textEreas: HTMLCollectionOf<HTMLTextAreaElement> = item.getElementsByTagName('textarea');

      let spans: HTMLCollectionOf<HTMLSpanElement> = item.getElementsByTagName('span');

      for(let i=0; i < inputs.length; i++){
        if(inputs.item(i)){
          inputs.item(i).addEventListener('focus', ()=>{
            spans.item(i).hidden = false;
            spans.item(i).firstChild.addEventListener('click', ()=>{
              spans.item(i).hidden = true;
              const updatedValue = inputs.item(i).value;
              const key = inputs.item(i).id;
              this.update(updatedValue, key);
            })
          })
        }
        //break;
      }


      for(let i=0; i < selects.length; i++){
        if(selects.item(i)){
          selects.item(i).addEventListener('input', ()=>{
            spans.item(i).hidden = false;
            spans.item(i).firstChild.addEventListener('click', ()=>{
              spans.item(i).hidden = true;
              const updatedValue = selects.item(i).value;
              const key = selects.item(i).id;
              this.update(updatedValue, key);
            })
          })
        }
      }

      for(let i=0; i < textEreas.length; i++){
        if(textEreas.item(i)){
          textEreas.item(i).addEventListener('input', ()=>{
            spans.item(i).hidden = false;
            spans.item(i).firstChild.addEventListener('click', ()=>{
              spans.item(i).hidden = true;
              const updatedValue = textEreas.item(i).value;
              const key = textEreas.item(i).id;
              this.update(updatedValue, key);
            })
          })
        }
      }
    }
  }


  toggleBox(label: HTMLLabelElement, input: HTMLInputElement, id: string, form: FormGroup, formArray: any[]){

    const control = new FormControl(id);
    const currentControl = input.value;
    const isChecked = label.toggleAttribute("checked");

    if(isChecked){
        (<FormArray>form.get(`${currentControl}`)).push(control);
    }else{
      let updatedArray = formArray.map(item=>{
        if(item !== id){
          return item;
        }
      });
      //undefined clear:
        updatedArray = updatedArray.filter(item=>{
          return item !== undefined;
        });

        form.value.tasks = updatedArray;

      }
  }



}
