import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(localStorage.getItem('token_songs')){
      return true;
    } else {
        this.router.navigate(['/login']);
      return false;
    }
  }
}

/* 
A partir de Angular 16 puede realizarse mediante una función simplificando todo.
export const loginGuard=()=>{
   if(localStorage.getItem('token_songs')){
    return true;
   }else{
    return false;
}

} */