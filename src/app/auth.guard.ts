import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return true;
    if (localStorage.getItem('IsEmployeeUSRec')!='0') {
      //this.router.navigate(['/home']);
      // logged in so return true
      console.log(localStorage.getItem('IsEmployeeUSRec'));
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
  return false;
  }
}
