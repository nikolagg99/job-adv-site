import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Advertisement } from "../advertisement.model";

@Injectable({
    providedIn: 'root'
})

export class AdvertisementService {
    private urlGetAll = `${environment.apiUrl}/API/advertisements`;
    private urlCreateNew = `${environment.apiUrl}/API/advertisement/create`;

    constructor(private http: HttpClient){

    }

    getAdvertisements$(): Observable<Advertisement[]> {
        return this.http.get<Advertisement[]>(this.urlGetAll);
    }

    postAdvertisement$(advertisement: Advertisement): Observable<Advertisement> {
        return this.http.post<Advertisement>(this.urlCreateNew, advertisement)
    }

    getAdvertisement$(id: any): Observable<any> {
        const url = `${environment.apiUrl}/API/advertisement/${id}`;

        return this.http.get<Advertisement>(url);
    }

    putAdvertisement$(adv: Advertisement): Observable<Advertisement> {
        const url = `${environment.apiUrl}/API/advertisement-update/${adv.id}`;

        return this.http.put<Advertisement>(url, adv)
    }

    deleteAdvertisement$(id: any): Observable<void> {
        const url = `${environment.apiUrl}/API/advertisement-delete/${id}`;

        return this.http.delete<void>(url);
    }
}