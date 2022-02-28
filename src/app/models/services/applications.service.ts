import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Applications } from "../applications.model";

@Injectable({
    providedIn:'root'
})

export class ApplicationsService {
    private urlCreateNew = `${environment.apiUrl}/API/application/create`;
    private urlGet = `${environment.apiUrl}/API/applications`;

    constructor(
        private http: HttpClient
    ){

    }

    postApplication$(application:Applications): Observable<Applications> {
        return this.http.post<Applications>(this.urlCreateNew, application);
    }

    getApplications$(): Observable<Applications[]> {
        return this.http.get<Applications[]>(this.urlGet);
    }

    putApplication$(application: Applications): Observable<Applications> {
        const url = `${environment.apiUrl}/API/application-update/${application.id}`;

        return this.http.put<Applications>(url, application);
    }

}