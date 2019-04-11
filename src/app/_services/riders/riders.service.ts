import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Rider } from 'src/app/_models/rider.model';

@Injectable({
  providedIn: 'root'
})
export class RidersService {

  constructor(private http: HttpClient, private constants: Constants) { }

  // Get all riders

  getRiders(): Observable<any> {
    return this.http.get(this.constants.RIDERS);
  }

  // Get rider by ID

  getRiderId(id: number) {
    return this.http.get(`this.constants.RIDERS/${id}`);
  }

  // Create rider
  createRider(rider: Rider) {
    return this.http.post(this.constants.RIDERS, rider);
  }

  // Update rider
updateRider(rider: Rider) {
  return this.http.put(`this.constants.RIDERS/${rider.id}`, rider);
}

  // Delete a rider
  deleteRider(id: number) {
    return this.http.delete(`this.constants.RIDERS/${id}`);
  }
}
