import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class Team{
  id: string;
  name: string;
  description: string;
  dateCreated: Date;
  users: string[];
  projects: string[];

  form?: FormGroup;

  constructor(private fb?: FormBuilder){

    this.form = this.fb.group({
      name:[null, Validators.required],
      description:[null, Validators.required],
      dateCreated:[new Date()],
      members:this.fb.array([]),
      projects:this.fb.array([]),
    })

  }
}
