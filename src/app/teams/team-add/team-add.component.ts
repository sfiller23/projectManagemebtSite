import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({

    })
  }

  // onSubmit(){
  //   this.usersService.addUser(this.addUserForm.value);
  // }

}
