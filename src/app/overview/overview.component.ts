import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  users: string = "users";
  teams: string = "teams";
  projects: string = "projects";
  tasks: string = "tasks";

  constructor() { }

  ngOnInit(): void {

  }

}
