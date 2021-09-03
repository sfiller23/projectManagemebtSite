import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addForm: boolean = false;
  addButtonState: string = "Add User";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  openForm(){
    this.addForm = !this.addForm;
    this.addForm ? this.addButtonState = "Close" : this.addButtonState = "Add User"
  }

}
