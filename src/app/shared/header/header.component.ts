import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from '@app/core';
import { OktaAuthService } from '@okta/okta-angular';

import { User } from '../../models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  user: User;
  isAuthenticated: boolean;

  constructor(private router: Router, private i18nService: I18nService, private oktaAuth: OktaAuthService) {
    // get authentication state for immediate use
    this.oktaAuth.isAuthenticated().then((result: boolean) => {
      this.isAuthenticated = result;
    });

    this.oktaAuth.getUser().then((user: User) => {
      this.user = user;
    });

    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean)  => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  login() {
    this.oktaAuth.loginRedirect('/home');
  }

  logout() {
    this.oktaAuth.logout('/home');
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    return this.user ? this.user.email : null;
  }

}
