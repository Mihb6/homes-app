import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { from, last, map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  constructor() { }

  getAllHousingLocations() : Observable<HousingLocation[]> {
    const data = from(fetch(this.url)).pipe(switchMap(data => from(data.json())));
    return data;
  }

  getHousingLocationById(id: Number): Observable<HousingLocation | undefined> {
    const data = from(fetch(`${this.url}/${id}`) ).pipe(switchMap(data => from(data.json())));
    return data;

    //return from(await data.json() ?? {});
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

}
