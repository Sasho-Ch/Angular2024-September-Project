import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Car } from '../../types/car';
import { DatePipe } from '@angular/common';
import { Theme } from '../../types/theme';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent {
  cars: Theme[] = [];
  constructor(private apiService: ApiService) {}
  isLoading = true;
  ngOnInit() {
    this.apiService.getThemes().subscribe((themes) => (this.cars = themes));
    this.isLoading = false;
  }
}
