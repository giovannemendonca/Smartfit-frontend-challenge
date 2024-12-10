import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UnitsResponse} from "../types/units-response.interface";
import {HttpClient} from "@angular/common/http";
import {Location} from '../types/location.interface'

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly apiUrl = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable()
  private filteredUnits: Location[] = []

  constructor(private http: HttpClient) {
    this.http.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations)
      this.filteredUnits = data.locations
    });
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$
  }

  getFilteredUnits(){
    return this.filteredUnits
  }

  setFilteredUnits(value: Location[]){
    this.filteredUnits = value
  }

}
