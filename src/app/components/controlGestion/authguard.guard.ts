// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthService } from 'src/app/service/auth.service';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(public auth: AuthService, public router: Router) {}
//   canActivate(): boolean {
//     if (!this.auth.login) {
//       this.router.navigate(['Login']);
//       return false;
//     }
//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn = false;

    constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}