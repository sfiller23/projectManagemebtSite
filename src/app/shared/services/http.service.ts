import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AngularFirestore } from '@angular/fire/firestore';
import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
import {from, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  add(data: any, module: string, itemId: string){
    return from(this.db.doc(`${module}/${itemId}`).set(data)).pipe(
      catchError(err => {
        console.log(err);
        alert("Could not create new instance");
        //add code that removes the item;
        return throwError(err);

      }));
    // return this.http.post<{name: string}>(`${environment.firebase.databaseURL}/${module}.json`,data).pipe(
    //   catchError(err => {
    //     console.log(err);
    //     alert("Could not create new instance");
    //     return throwError(err);
    //   }));
  }

  update(data: any, module: string, id: string){
    return from(this.db.doc(`${module}/${id}`).update(data));
  }

  getItem(module: string, id: string){
    return this.http.get(`${environment.firebase.databaseURL}/${module}/${id}.json`);
  }

  getAll(module: string){
    return this.db.collection(module).get();
  }

  delete(module: string, id: string){
    return from(this.db.doc(`${module}/${id}`).delete());
  }
}
