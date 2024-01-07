import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDto } from 'src/app/_interfaces/response.module';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user.module';
import { userInfo } from 'src/app/_interfaces/userInfo.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GoogleAuthcService } from 'src/app/services/google-auth/google-authc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl: string | undefined;
  
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;
  showPassword = true;
  user!: any;
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private googleAuth: GoogleAuthcService) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginWithGoogle() {
    this.googleAuth.login();
    this.user = this.googleAuth.getProfile();
    
  }

  handleButtonClick() {
    this.showPassword = !this.showPassword;
  }

  validateControl = (controlName: string) => {
    const control = this.loginForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
  
  hasError = (controlName: string, errorName: string) => {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }
  
  
  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }
    this.authService.loginUser(userForAuth)
    .subscribe({
      next: (response: AuthResponseDto) => {
        this.authService.UserisAuth = true;
        const id = response.id;
        localStorage.setItem('UserisAuth', 'true');
        localStorage.setItem('Id', id);
        this.authService.GetUser(id).subscribe({
          next: (response: userInfo) => {
            localStorage.setItem("email", response.email);
            localStorage.setItem("adress", response.adress);
            localStorage.setItem("phone", response.phone);
            localStorage.setItem("workplace", response.workplace);
            localStorage.setItem("username", response.username);
          }
        });
        this.router.navigate([""]);
        console.log(id);
    },
    error: (err: HttpErrorResponse) => {
      if(err.status === 401)
      {
        this.errorMessage = err.error.message;
        this.showError = true;
      }
      else if(err.status === 500)
      {
        this.errorMessage = "Bad request to server";
      }
      else if(err.status === 404)
      {
        this.errorMessage = "Something went wrong";
      }
    }})

    
  }
}
