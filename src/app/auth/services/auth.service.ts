import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private urlLogin = `${environment.apiUrl}/API/login`;
    private urlRegister = `${environment.apiUrl}/API/register`;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {

    }

    register$(user: User): Observable<User> {
        return this.http.post<User>(this.urlRegister, user);
    }

    login$(data: Login): Observable<User> {
        return this.http.post<User>(this.urlLogin, data);
    }

    getUser$(id: any): Observable<any> {
        const url = `${environment.apiUrl}/API/user/${id}`;

        return this.http.get<User>(url);
    }

    putUser$(user: User): Observable<User> {
        const url = `${environment.apiUrl}/API/user-update/${user.id}`;

        return this.http.put<User>(url, user)
    }

    deleteUser$(id: any): Observable<void> {
        const url = `${environment.apiUrl}/API/user-delete/${id}`;

        return this.http.delete<void>(url);
    }

    logout(): void {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userID');
        location.reload();
    }

    // Store data about the user in the local storage
    storeUserToken(user: any): void {
        localStorage.setItem('userToken', user.token)
    }

    storeUserRole(user: any): void {
        localStorage.setItem('userRole', user);
    }

    storeUserID(userID: any): void {
        localStorage.setItem('userID', userID);
    }

    // Get the user token from local storage
    getUserTokenFromStorage(): string | null {
        return localStorage.getItem('userToken');
    }

    // get the user role from local storage
    getUserRoleFromStorage(): string | null {
        return localStorage.getItem('userRole');
    }
}

