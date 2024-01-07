import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "Login",
    component : LoginComponent
  },
  {
    path: "Registration",
    component: RegisterComponent
  },
  {
    path: "Profile",
    component: ProfileComponent
  },
  {
    path: "Detail/:Id",
    component: DetailInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
