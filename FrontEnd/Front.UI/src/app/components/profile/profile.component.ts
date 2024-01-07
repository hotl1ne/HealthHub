import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthcService } from 'src/app/services/google-auth/google-authc.service';
import { userInfo } from 'src/app/_interfaces/userInfo.module';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  url: string = "";
  email = localStorage.getItem("email");
  username = localStorage.getItem("username");
  constructor(private google: GoogleAuthcService, private router: Router, private AuthService: AuthenticationService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = new FormGroup({
      password: new FormControl(),
      adress: new FormControl(localStorage.getItem("adress")),
      workplace: new FormControl(localStorage.getItem("workplace")),
      phone: new FormControl(localStorage.getItem("phone"))
    });
  }

  formCheck(profileFormValue: any) {
   const user : userInfo = {
    username : "Misa",
    email : profileFormValue.email,
    adress : profileFormValue.adress,
    password : profileFormValue.password,
    phone : profileFormValue.phone,
    workplace : profileFormValue.workplace
   };
    const id = localStorage.getItem("Id");
    if (id !== null) {
      this.AuthService.ChangeInfo(id, user)
        .subscribe({
          next: () => {
            localStorage.setItem("adress", profileFormValue.adress);
            localStorage.setItem("phone", profileFormValue.phone);
            localStorage.setItem("workplace", profileFormValue.workplace);
            this.router.navigate(['']); 
          },
          error: (error) => {
            console.error('Error occurred:', error);
          }
        });
    }
  }

  logOut() {
    const userId = localStorage.getItem("Id");
    if(userId !== null)
    this.AuthService.Logout(userId);
    this.google.logout();
    localStorage.clear();
    this.router.navigate(['']);
  }

  userIsLogin() {
    const isUserAuth = localStorage.getItem('UserisAuth');
    if (isUserAuth === 'true') {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
}

