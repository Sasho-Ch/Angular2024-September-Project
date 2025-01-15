import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Theme } from '../../types/theme';

@Component({
  selector: 'app-current-car',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-car.component.html',
  styleUrl: './current-car.component.css'
})
export class CurrentCarComponent{
  car = {} as Theme;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {}

  get isLoggedIn():boolean {
    return this.userService.isLogged;
  }
  
  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];
    this.apiService.getSingleTheme(id).subscribe((theme) => {
      this.car = theme;
    });
  }

  delete() {
    const id = this.car._id;
    this.apiService.deleteTheme(id).subscribe((theme) => {
      this.car = theme;
    });
    this.router.navigate(['/gallery'])
  }
}
