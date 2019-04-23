import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private constants: Constants,
    private http: HttpClient,
  ) { }

  // Set Rider location

  setRiderLocation(id: number): Observable<any> {
    return this.http.post(this.constants.RIDERS + `/` + id + `/locations`, location);
  }

  // Set Client Location

  setClientLocation(id: number) {
    return this.http.put(this.constants.CLIENTS + `/` + id + `/locations`, location);
  }

  // Get riders within a geolocation
  getRidersLocation(longitude,latitude) {
    return this.http.get(this.constants.RIDERS_LOCATION_SEARCH );
  }

}
