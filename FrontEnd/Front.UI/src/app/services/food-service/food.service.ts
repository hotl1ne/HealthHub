import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { food } from 'src/app/_interfaces/food.module';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  
  public getAllFoods = () =>{
    return this.http.get<food[]>("https://localhost:7106/api/Food/GetAll");
  }

  public GetFoodbyID = (Id:string) =>{
    const url = `https://localhost:7106/api/Food/GetById/${Id}`;
    return this.http.get<food>(url);
  }

}
