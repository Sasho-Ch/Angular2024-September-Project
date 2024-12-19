import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-current-car',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-car.component.html',
  styleUrl: './current-car.component.css'
})
export class CurrentCarComponent{

}
