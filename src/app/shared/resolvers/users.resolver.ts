import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<boolean> {


  constructor(private dataService: DataService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.dataService.users$.pipe(first()).subscribe(users=>{
      if(!users){
        this.dataService.getAll("users").subscribe(res=>{
          const currentUsers: User[] = res;
          console.log("users resolver");
          this.dataService.initData("users", currentUsers);
        })
      }
    })

    return of(true);
  }
}
