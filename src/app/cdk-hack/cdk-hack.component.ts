import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdk-hack',
  templateUrl: './cdk-hack.component.html',
  styleUrls: ['./cdk-hack.component.css']
})
export class CdkHackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.navigate(['']);
    console.log("been in cdk hack");

  }

}
