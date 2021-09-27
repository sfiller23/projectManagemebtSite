import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;


export class Task{
  id: string;
  name: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  state: string;

  form?: FormGroup

  constructor(private fb?: FormBuilder){
    this.form = this.fb.group({
      name:[null,Validators.required],
      description:[null,Validators.required],
      startDate:[null,Validators.required],
      endDate:[null,Validators.required],
      state:['inProgress',Validators.required],
    })
  }
}
