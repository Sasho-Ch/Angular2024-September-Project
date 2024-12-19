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
    const {apiUrl} = environment
    let url = `/cars`;
    return this.http.get<Car[]>(`${apiUrl}${url}`);
  }

}
