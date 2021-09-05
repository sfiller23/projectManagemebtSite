import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GeneralService } from './general.service';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //users store:
  private usersSubject = new BehaviorSubject<User[]>(null);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  //teams store:
  private teamsSubject = new BehaviorSubject<Team[]>(null);
  teams$: Observable<Team[]> = this.teamsSubject.asObservable();

  //projects store:
  private projectsSubject = new BehaviorSubject<Project[]>(null);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();

  //task store:
  private tasksSubject = new BehaviorSubject<Task[]>(null);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private router: Router ,private http: HttpService, private generalService: GeneralService) {

  }

  initData(module: string, dataArray: any[]){
    switch(module){
      case "users":{
        this.usersSubject.next(dataArray);
        break;
      }
      case "teams":{
        this.teamsSubject.next(dataArray);
        break;
      }
      case "projects":{
        this.projectsSubject.next(dataArray);
        break;
      }
      case "tasks":{
        this.tasksSubject.next(dataArray);
        break;
      }
      default: {
        //statements;
        break;
     }
    }
  }

  addData(data: any, module: string){

    this.http.add(data, module).subscribe(res=>{
      const currentData = {
        id: res.name, ...data
      }

      this.pushData(module, currentData);

    })
  }

  updateData(data: any, module: string, id: string){
    let currentData;
    switch(module){
      case "users":{
        currentData = this.usersSubject.value;
        break;
      }
      case "teams":{
        currentData = this.teamsSubject.value;
        break;
      }
      case "projects":{
        currentData = this.projectsSubject.value;
        break;
      }
      case "tasks":{
        currentData = this.tasksSubject.value;
        break;
      }
      default: {
        //statements;
        break;
     }
    }

    let itemToUpdate;

      itemToUpdate = currentData.filter(item=>item.id==id);

      for(var field in itemToUpdate[0]){
        if(data.hasOwnProperty(field)){
          itemToUpdate[0][field] = data[field];
        }
      }


    let updatedArray = currentData.filter(item=>item.id!=id);


      updatedArray.push(itemToUpdate[0]);



    //console.log(updatedDataArrey);
    this.initData(module, updatedArray);
    return this.http.update(data, module, id);
  }

  getAll(module: string){
    return this.http.getAll(module).pipe(map(res=>this.generalService.apiObjectToArray(res)));
  }

  getItemData(module: string, id: string){
    return this.http.getItem(module, id);
  }


  private pushData(module: string, currentData: any){
    switch(module) {
      case "users": {
        let currentUsers: User[] = this.usersSubject.getValue();
        currentUsers ? currentUsers : currentUsers = [];
        currentUsers.unshift(currentData);
        this.usersSubject.next(currentUsers);
        break;
      }
      case "teams": {
        let currentTeams: Team[] = this.teamsSubject.getValue();
        currentTeams ? currentTeams : currentTeams = [];
        currentTeams.unshift(currentData);
        this.teamsSubject.next(currentTeams);
        break;
      }
      case "projects": {
        let currentProjects: Project[] = this.projectsSubject.getValue();
        currentProjects ? currentProjects : currentProjects = [];
        currentProjects.unshift(currentData);
        this.projectsSubject.next(currentProjects);
        break;
      }
      case "tasks": {
        let currentTasks: Task[] = this.tasksSubject.getValue();
        currentTasks ? currentTasks : currentTasks = [];
        currentTasks.unshift(currentData);
        this.tasksSubject.next(currentTasks);
        break;
      }
      default: {
         //statements;
         break;
      }
   }

  }

  onDelete(module: string, id: string){

    switch(module){
      case "users": {
        let currentUsers: User[] = this.usersSubject.getValue();
        currentUsers ? currentUsers : currentUsers = [];
        const updatedUsers = currentUsers.filter(user=>user.id!==id);
        this.usersSubject.next(updatedUsers);
        break;
      }
      case "teams": {
        let currentTeams: Team[] = this.teamsSubject.getValue();
        currentTeams ? currentTeams : currentTeams = [];
        const updatedTeams = currentTeams.filter(team=>team.id!==id);
        this.teamsSubject.next(updatedTeams);
        break;
      }
      case "projects": {
        let currentProjects: Project[] = this.projectsSubject.getValue();
        currentProjects ? currentProjects : currentProjects = [];
        const updatedProjects = currentProjects.filter(project=>project.id!==id);
        this.projectsSubject.next(updatedProjects);
        break;
      }
      case "tasks": {
        let currentTasks: Task[] = this.tasksSubject.getValue();
        currentTasks ? currentTasks : currentTasks = [];
        const updatedTasks = currentTasks.filter(user=>user.id!==id);
        this.tasksSubject.next(updatedTasks);
        break;
      }
      default: {
         //statements;
         break;
      }
    }
    this.http.delete(module, id).pipe(first()).subscribe();
  }
}
