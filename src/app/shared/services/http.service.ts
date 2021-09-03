import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  add(data: any, module: string){
    return this.http.post<{name: string}>(`${environment.firebase.databaseURL}/${module}.json`,data);
  }

  update(data: any, module: string, id: string){
    return this.http.patch(`${environment.firebase.databaseURL}/${module}/${id}.json`,data);
  }

  getItem(module: string, id: string){
    return this.http.get(`${environment.firebase.databaseURL}/${module}/${id}.json`);
  }

  getAll(module: string){
    return this.http.get(`${environment.firebase.databaseURL}/${module}.json`);
  }
}
