import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsResolver implements Resolve<boolean> {
  constructor(private dataService: DataService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.dataService.projects$.pipe(first()).subscribe(projects=>{
      if(!projects){
        this.dataService.getAll("projects").subscribe(res=>{
          const currentProjects: Project[] = res;
          console.log("projects resolver");
          this.dataService.initData("projects", currentProjects);
        })
      }
    })
    return of(true);
  }
}
