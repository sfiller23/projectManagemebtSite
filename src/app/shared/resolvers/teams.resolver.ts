import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Project } from '../models/project.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsResolver implements Resolve<boolean> {

  constructor(private dataService: DataService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.dataService.teams$.pipe(first()).subscribe(teams=>{
      if(!teams){
        this.dataService.getAll("teams").subscribe(res=>{
          const currentTeams: Team[] = res;
          console.log("Teams resolver");
          this.dataService.initData("teams", currentTeams);
        })
      }
    })
    return of(true);
  }
}
