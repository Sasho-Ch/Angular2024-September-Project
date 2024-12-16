import { Component } from '@angular/core';
import { WheelLoaderComponent } from "../shared/wheel-loader/wheel-loader.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [WheelLoaderComponent, RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
