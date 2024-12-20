import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ErrorComponent } from './error/error.component';
import { CarsListComponent } from './car/cars-list/cars-list.component';
import { AddCarComponent } from './car/add-car/add-car.component';
import { AboutComponent } from './about/about.component';
import { CurrentCarComponent } from './car/current-car/current-car.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'gallery',
    children: [
      { path: '', component: CarsListComponent, canActivate: [AuthGuard] },
      {
        path: ':themeId',
        component: CurrentCarComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-car', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
