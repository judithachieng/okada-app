import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Moto } from './../../_models/moto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  baseUrl = environment.baseUrl;
  riderId: number;

  constructor(
    private http: HttpClient,
    private constants: Constants,
    ) { }

  getMotos(riderId): Observable<any> {
    return this.http.get(this.constants.RIDERS + '/' + riderId + '/motos');
  }

  // Create Moto
  createMoto(id, moto: Moto) {
    return this.http.post(this.constants.RIDERS + '/' + id + '/motos', moto);
  }

  updateMoto(id, motoId, moto: Moto) {
    return this.http.put(this.constants.RIDERS + '/' + id + '/motos/' + motoId, moto);
  }
}
