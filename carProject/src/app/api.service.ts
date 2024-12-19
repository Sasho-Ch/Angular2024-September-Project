import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './types/car';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCars() {
    const {apiUrl} = environment;
    return this.http.get<Car[]>(`${apiUrl}/cars`);
  }

  getSingleCar(id:string) {
    const {apiUrl} = environment;
    return this.http.get<Car>(`${apiUrl}/cars/${id}`);
  }

  createCar(carBrand: string, carModel: string, carYear: string, carColour: string) {
    const {apiUrl} = environment;
    const payload = {carBrand, carModel, carYear, carColour};

    return this.http.post<Car>(`${apiUrl}/cars`, payload);
  }
}
