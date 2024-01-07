import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterResponseDto } from 'src/app/_interfaces/RegisterResponse.module';
import { AuthResponseDto } from 'src/app/_interfaces/response.module';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user.module';
import { UserForRegistrationDto } from 'src/app/_interfaces/userReg.module';
import { googleUser } from 'src/app/_interfaces/googleUser.module';
import { userInfo } from '../_interfaces/userInfo.module';
import { googleUserResponse } from '../_interfaces/googleRegisterResponse.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  public UserisAuth: boolean = false;
  
  constructor(private http: HttpClient) { }

  public loginUser = (body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>("https://localhost:7106/api/auth/Login", body);
  }

  public registerUser = (body: UserForRegistrationDto) => {
    return this.http.post<RegisterResponseDto>("https://localhost:7106/api/auth/Register", body);
  }

  public registerGoogle = (body: googleUser) => {
    return this.http.post<googleUserResponse>("https://localhost:7106/api/auth/RegisterGoogle", body);
  }

  public GetUser = (Id: string) => {
    const url = `https://localhost:7106/api/auth/getUser/${Id}`;
    return this.http.get<userInfo>(url);
  }

  public ChangeInfo = (Id:string, body: userInfo) => {
    const url = `https://localhost:7106/api/auth/ChangeInfo/${Id}`;
    return this.http.put<Observable<any>>(url, body);
  }

  public Logout = (Id: string) => {
    const url = `https://localhost:7106/api/auth/Logout/${Id}`;
    return this.http.delete<Observable<any>>(url);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
}
