import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  roles: string[] = ['dev','team_leader','client','customer_support','observer'];

  constructor() { }

  apiObjectToArray(res: any): any[]{
    console.log(res);
    const postsArray = [];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        postsArray.push({...res[key], id: key});
      }
    }
    return postsArray;
  }

  apiObjectToModelArray(results)  {
    return <any[]> results.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}
}
