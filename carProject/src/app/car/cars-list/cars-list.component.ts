import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Car } from '../../types/car';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent {
  cars: Car[] = [];
  constructor(private apiService: ApiService) {}
  isLoading = true;
  ngOnInit() {
    this.apiService.getCars().subscribe((cars) => (this.cars = cars));
    this.isLoading = false;
  }
  
}
