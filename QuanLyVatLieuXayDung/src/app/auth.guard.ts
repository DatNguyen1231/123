import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataServiceService } from './data/dataService/data-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataServiceService) {}

  canActivate() {
    if (this.dataService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
