import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  roles: string[] = ['dev','team_leader','client','customer_support','observer'];

  constructor() { }

  apiObjectToArray(res: any): any[]{

    const postsArray = [];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        postsArray.push({...res[key], id: key});
      }
    }
    return postsArray;
  }
}
