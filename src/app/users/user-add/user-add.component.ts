import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      phoneNumber:[null,[Validators.required]],
      role:[null,[Validators.required]],
    })
  }

  onSubmit(){
   // this.dataService.addData(this.addUserForm.value, "users");
  }

}
