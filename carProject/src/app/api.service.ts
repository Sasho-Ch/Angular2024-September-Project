import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from './types/theme';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getThemes() {
    return this.http.get<Theme[]>(`/api/themes`);
  }

  getSingleTheme(id:string) {
    return this.http.get<Theme>(`/api/themes/${id}`)
  }

  createTheme(themeName: string, carBrand: string, carModel: string, carColour: string, carYear: string, postText: string) {
    const payload = {themeName, carBrand, carModel, carColour, carYear, postText };

    return this.http.post<Theme>(`/api/themes`, payload);
  }

  deleteTheme(id:string) {
    return this.http.delete<Theme>(`/api/themes/${id}`)
  }
}
