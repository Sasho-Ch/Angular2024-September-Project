import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  constructor (private apiService: ApiService, private router: Router) {}

  addCar(form: NgForm) {
    console.log(form);
    
    if(form.invalid) {
      return;
    }

    const {themeName = 'themeName', carBrand, carModel, carColour, carYear, postText = 'postText'} = form.value
    
    this.apiService.createTheme(themeName, carBrand, carModel, carColour, carYear, postText).subscribe(() => {
      this.router.navigate(['/gallery'])
    })
  }
}
