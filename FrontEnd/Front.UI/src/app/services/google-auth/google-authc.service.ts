import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthcService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin();
  }

  private initLogin()
  {
    const oAuthConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin,
      clientId: '95447186425-ihb2cphlq3t26s754uuh9al3lan6rdrk.apps.googleusercontent.com',
      scope: 'openid profile email'
    };

    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login()
  {
    this.oAuthService.initLoginFlow();
  }

  logout()
  {
    this.oAuthService.logOut();
  }

  getProfile()
  {
    return this.oAuthService.getIdentityClaims();
  }

}
