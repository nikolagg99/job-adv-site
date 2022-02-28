import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../models/advertisement.model';
import { AdvertisementService } from '../../models/services/advertisement.service';

@Component({
  selector: 'app-all-advertisements',
  templateUrl: './all-advertisements.component.html',
  styleUrls: ['./all-advertisements.component.scss']
})
export class AllAdvertisementsComponent implements OnInit {

  advertisements!: Advertisement[];
  errorMesage!: string;

  constructor(private advertisementsService: AdvertisementService) {
  }

  ngOnInit(): void {
    this.getAdvertisements()
  }

  // Method for reloading the get query
  likesUpdate(): void {
    this.getAdvertisements();
  }

  // Method for getting all the advertisements
  private getAdvertisements(): void {
    this.advertisementsService.getAdvertisements$().subscribe({
      next: (repsonse: any) => {
        this.advertisements = repsonse.advertisements;
      },
      error: (response: HttpErrorResponse) => {
        this.errorMesage = response.message;
      }
    });
  }

}
