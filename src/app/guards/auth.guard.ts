import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const userToken = this.authService.getUserTokenFromStorage();

        if(!userToken) {
            this.router.navigate(['/auth', 'login']);

            return false;
        }

        return true;
    }
}