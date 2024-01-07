import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { food } from 'src/app/_interfaces/food.module';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search_food = (name:string) => {
    const url = `https://localhost:7106/api/Search/FindFood/${name}`;
    return this.http.get<food[]>(url);
  }

}
