import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForRegistrationDto } from 'src/app/_interfaces/userReg.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {} from 'gapi.auth2';
import { GoogleAuthcService } from 'src/app/services/google-auth/google-authc.service';
import { googleUser } from 'src/app/_interfaces/googleUser.module';
import { RegisterResponseDto } from 'src/app/_interfaces/RegisterResponse.module';
import { Router } from '@angular/router';
import { googleUserResponse } from 'src/app/_interfaces/googleRegisterResponse.module';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  passwordsMatchError = false;
  showPassword = true;
  forRegister: any;
  showPassword2 = true;
  step_error = false;
  slide = 0;
  progress = 1;

  fieldValues: { [key: string]: any } = {};

  constructor(private authService: AuthenticationService, private googleAuth: GoogleAuthcService, private router: Router) { }


  registerWithGoogle(){
    this.googleAuth.login();
    this.forRegister = this.googleAuth.getProfile();
    const user : googleUser = {
      email: this.forRegister.email,
      latsName: this.forRegister.given_name,
      firstName: this.forRegister.family_name,
      photo: this.forRegister.picture,
    }
    console.log(user);
    this.authService.registerGoogle(user).subscribe({
      next: (response: googleUserResponse) => {
        const email=response.Email;
        const username = response.UserName;
        const photo = response.Photo_Url;
        const Id = response.Id;

        this.authService.UserisAuth = true;
        localStorage.setItem("UserisAuth", 'true');
        localStorage.setItem("Id", Id);
        localStorage.setItem("email", email);
        localStorage.setItem("photo", photo);
        localStorage.setItem("username", username);
        this.router.navigate(['']);
      },
      error: () =>
      {
        console.error()
      }
    });
  }
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      passwordConfirmed: new FormControl('',[Validators.required]),
      Url_Photo: new FormControl(''),
      DateOfBirh: new FormControl('',[Validators.required]),
      Phone: new FormControl('',[Validators.required]),
      Adress: new FormControl('',[Validators.required]),
      Workplace: new FormControl('',[Validators.required]),
      Rate: new FormControl('',[Validators.required]),
      Knowlages: new FormControl('',[Validators.required]),
      Sertificates: new FormControl('')
    });
  }

  fieldSet()
  {
    this.fieldValues['Username'] = this.registerForm.get('Username')?.value;
    this.fieldValues['Email'] = this.registerForm.get('Email')?.value;
    this.fieldValues['Password'] = this.registerForm.get('Password')?.value;
    this.fieldValues['passwordConfirmed'] = this.registerForm.get('passwordConfirmed')?.value;
    this.fieldValues['Url_Photo'] = this.registerForm.get('Url_Photo')?.value;
    this.fieldValues['DateOfBirh'] = this.registerForm.get('DateOfBirh')?.value;
    this.fieldValues['Phone'] = this.registerForm.get('Phone')?.value;
    this.fieldValues['Adress'] = this.registerForm.get('Adress')?.value;
    this.fieldValues['Workplace'] = this.registerForm.get('Workplace')?.value;
    this.fieldValues['Rate'] = this.registerForm.get('Rate')?.value;
    this.fieldValues['Knowlages'] = this.registerForm.get('Knowlages')?.value;
    this.fieldValues['Sertificate'] = this.registerForm.get('Sertificates')?.value;
  }

  fielGet()
  {
    this.registerForm.get('Username')?.setValue(this.fieldValues['Username']);
    this.registerForm.get('Email')?.setValue(this.fieldValues['Email']);
    this.registerForm.get('Password')?.setValue(this.fieldValues['Password']);
    this.registerForm.get('passwordConfirmed')?.setValue(this.fieldValues['passwordConfirmed']);
    this.registerForm.get('Url_Photo')?.setValue(this.fieldValues['Url_Photo']);
    this.registerForm.get('DateOfBirh')?.setValue(this.fieldValues['DateOfBirh']);
    this.registerForm.get('Phone')?.setValue(this.fieldValues['Phone']);
    this.registerForm.get('Adress')?.setValue(this.fieldValues['Adress']);
    this.registerForm.get('Workplace')?.setValue(this.fieldValues['Workplace']);
    this.registerForm.get('Rate')?.setValue(this.fieldValues['Rate']);
    this.registerForm.get('Knowlages')?.setValue(this.fieldValues['Knowlages']);
    this.registerForm.get('Sertificates')?.setValue(this.fieldValues['Sertificates']);
  }

  step_1_Check():boolean       
  {
    this.fieldValues['Username'] = this.registerForm.get('Username')?.value;
    this.fieldValues['Email'] = this.registerForm.get('Email')?.value;
    this.fieldValues['Password'] = this.registerForm.get('Password')?.value;
    this.fieldValues['passwordConfirmed'] = this.registerForm.get('passwordConfirmed')?.value;

    console.log(this.fieldValues['Username'], this.fieldValues['Email'], this.fieldValues['Password'], this.fieldValues['passwordConfirmed']);
    
    if (
      this.fieldValues['Username'] === null ||
      this.fieldValues['Username'] === '' ||
      this.fieldValues['Username'] === undefined ||
      this.fieldValues['Email'] === null ||
      this.fieldValues['Email'] === '' ||
      this.fieldValues['Email'] === undefined ||
      this.fieldValues['Password'] === null ||
      this.fieldValues['Password'] === '' ||
      this.fieldValues['Password'] === undefined ||
      this.fieldValues['passwordConfirmed'] === null ||
      this.fieldValues['passwordConfirmed'] === '' ||
      this.fieldValues['passwordConfirmed'] === undefined
    ) {
      console.log("false");
      return false;
    } else {
      console.log("true");
      return true;
    }
    
  }

  step_2_Check():boolean       
  {
    this.fieldValues['Url_Photo'] = this.registerForm.get('Url_Photo')?.value;
    this.fieldValues['DateOfBirh'] = this.registerForm.get('DateOfBirh')?.value;
    this.fieldValues['Phone'] = this.registerForm.get('Phone')?.value;
    this.fieldValues['Adress'] = this.registerForm.get('Adress')?.value;
    console.log(this.fieldValues['Url_Photo'],this.fieldValues['DateOfBirh'],this.fieldValues['Phone'],this.fieldValues['Adress']);
    if (
      this.fieldValues['Url_Photo'] === null || 
      this.fieldValues['Url_Photo'] === undefined || 
      this.fieldValues['Url_Photo'] === "" || 
      this.fieldValues['DateOfBirh'] === null || 
      this.fieldValues['DateOfBirh'] === undefined || 
      this.fieldValues['DateOfBirh'] === "" ||   
      this.fieldValues['Phone'] === null || 
      this.fieldValues['Phone'] === undefined || 
      this.fieldValues['Phone'] === "" || 
      this.fieldValues['Adress'] === null || 
      this.fieldValues['Adress'] === undefined || 
      this.fieldValues['Adress'] === ""     ) 
      {
      return false; 
    } else {
      return true; 
    }
    
  }

  step_3_Check():boolean       
  {
    this.fieldValues['Workplace'] = this.registerForm.get('Workplace')?.value;
    this.fieldValues['Rate'] = this.registerForm.get('Rate')?.value;
    this.fieldValues['Knowlages'] = this.registerForm.get('Knowlages')?.value;
    this.fieldValues['Sertificates'] = this.registerForm.get('Serticicates')?.value;
    console.log(this.fieldValues['Workplace'],this.fieldValues['Rate'],this.fieldValues['Knowlages'],this.fieldValues['Sertificates']);
       
    if (
      this.fieldValues['Workplace'] === null || 
      this.fieldValues['Workplace'] === undefined || 
      this.fieldValues['Workplace'] === "" ||
      this.fieldValues['Rate'] === null || 
      this.fieldValues['Rate'] === undefined || 
      this.fieldValues['Rate'] === "" ||
      this.fieldValues['Knowlages'] === null || 
      this.fieldValues['Knowlages'] === undefined || 
      this.fieldValues['Knowlages'] === "" ||
      this.fieldValues['Sertificates'] === null || 
      this.fieldValues['Sertificates'] === undefined || 
      this.fieldValues['Sertificates'] === ""
    ) {
      return false;
    } else {
      return true;
    }
    
  }

  next_Step() {
    console.log(this.slide);
    if(this.slide === 0)
    {
      if (this.step_1_Check()) 
      {
        console.log("step 1 passed");
        this.IncNum();
        this.step_error=false;
      }
      else
      {
        this.step_error=true;
        console.log("step not passed", this.slide);
      }
    }
    else if(this.slide === 1)
    {
      if (this.step_2_Check()) 
      {
        console.log("step 2 passed");
        this.IncNum();
        this.step_error=false;
      }
      else
      {
        this.step_error=true;
        console.log("step not passed", this.slide);
      }
    }
    else if(this.slide === 2)
    {
      if (this.step_3_Check()) 
      {
        console.log("step 3 passed");
        this.IncNum();
        this.step_error=false;
      }
      else
      {
        this.step_error=true;
        console.log("step not passed", this.slide);
      }
    }
    else
    {
        console.log("error");
    }
  }
  
  IncNum()
  {
    this.slide++;
    this.progress++;
    this.fieldSet();
  }

  DecNum()
  {
    this.step_error = false;
    this.slide--;
    this.progress--;
    this.fieldSet();
    this.fielGet();
  }

  handleButtonClick() {
    this.showPassword = !this.showPassword;
  }
  
  handleButtonClick2() {
    this.showPassword2 = !this.showPassword2;
  }

  hasError = (controlName: string, errorName: string) => {
    const control = this.registerForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }

  validateControl = (controlName: string) => {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    
    const password = formValues.password;
    const passwordConfirmed = formValues.passwordConfirmed;
    if (password !== passwordConfirmed && (password === '' && passwordConfirmed === '')) {
      this.passwordsMatchError = true; 
      return; 
    } else {
      this.passwordsMatchError = false; 
    }

    const user: UserForRegistrationDto = {
      Username: formValues.Username,
      Email: formValues.Email,
      Password: formValues.Password,
      Url_Photo: formValues.Url_Photo,
      DateOfBirh: formValues.DateOfBirh,
      Phone: formValues.Phone,
      Adress: formValues.Adress,
      Workplace: formValues.Workplace,
      Rate: formValues.Rate,
      Knowlages: formValues.Knowlages,
      Sertificates: formValues.Sertificates
    };

    this.authService.registerUser(user).subscribe({
      next: (response: RegisterResponseDto) =>
      {
        this.authService.UserisAuth=true;
        localStorage.setItem("UserisAuth", "true");
        localStorage.setItem("Id", response.id);
        localStorage.setItem("email", response.email);
        localStorage.setItem("adress", response.adress);
        localStorage.setItem("phone", response.phone);
        localStorage.setItem("workplace", response.workplace);
        localStorage.setItem("username", response.username);
        localStorage.setItem("photo", response.photo);
        localStorage.setItem("sertificates", response.sertificates);
        this.router.navigate(['']);
      }
    });
  }
}