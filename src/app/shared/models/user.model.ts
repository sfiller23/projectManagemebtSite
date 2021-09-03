import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export class User{

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;

  form?: FormGroup;

  constructor(private fb?: FormBuilder){

    this.form = this.fb.group({

      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      phoneNumber:[null,[Validators.required]],
      role:[null,[Validators.required]],

    })

  }
}
