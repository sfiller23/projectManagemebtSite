import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<boolean> {

  constructor(private dataService: DataService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.dataService.tasks$.pipe(first()).subscribe(tasks=>{
      if(!tasks){
        this.dataService.getAll("tasks").subscribe(res=>{
          const currentTasks: Task[] = res;
          console.log("Tasks resolver");
          this.dataService.initData("tasks", currentTasks);
        })
      }
    })
    return of(true);
  }
}
