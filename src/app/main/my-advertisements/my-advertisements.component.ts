import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advertisement } from 'src/app/models/advertisement.model';
import { AdvertisementService } from 'src/app/models/services/advertisement.service';

@Component({
  selector: 'app-my-advertisements',
  templateUrl: './my-advertisements.component.html',
  styleUrls: ['./my-advertisements.component.scss']
})
export class MyAdvertisementsComponent implements OnInit {

  userName!: any;
  errorMesage!: string;
  advertisements!: Advertisement[];

  constructor(
    private advertisementsService: AdvertisementService,
    private userService: AuthService
  ) {
    this.advertisements = []
    this.userName = localStorage.getItem('userID')
  }

  ngOnInit(): void {
    this.getAdvertisements();
  }

  reloadOnDelete(): void {
    this.getAdvertisements();
  }

  // Method for getting all the advertisements
  private getAdvertisements(): void {
    this.advertisementsService.getAdvertisements$().subscribe({
      next: (response: any) => {

        // looping through the response
        for (let adv of response.advertisements) {
          // checking if the name of the logged company is equal to the 
          // name of the company of the advetisement and pish it to the array
          if (adv.company_name === this.userName) {
            this.advertisements.push(adv)
          }
        }

      },
      error: (response: HttpErrorResponse) => {
        this.errorMesage = response.message;
      }
    });
  }
}
