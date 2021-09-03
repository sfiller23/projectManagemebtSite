import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class Project{
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  state: string;
  tasks: string[];

  form?: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name:[null,Validators.required],
      description:[null,Validators.required],
      startDate:[null,Validators.required],
      endDate:[null,Validators.required],
      state:['inProgress',Validators.required],
      tasks:this.fb.array([]),
    })
  }
}
