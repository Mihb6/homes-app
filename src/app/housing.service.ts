import { Injectable, inject } from '@angular/core';
import { HousingLocation } from './housing-location';
import { catchError, from, last, map, Observable, switchMap, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  router = inject(Router);

  getAllHousingLocations() : Observable<HousingLocation[]> {
    const data = from(fetch(this.url)).pipe(switchMap(data => from(data.json())));
    return data;
  }

  getHousingLocationById(id: Number): Observable<HousingLocation> {
    const data = from(fetch(`${this.url}/${id}`) ).pipe(

      switchMap(data => from(data.json())),
      map((value) => {
        if(!value || !value.id) throw new Error("Not found");
        return value;
    }),
    catchError((err) => {
      console.log("Greška:", err.message);
      this.router.navigate(['/']); // vrati na home
      return EMPTY; 
    })
    );
    return data;

    
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

}
