import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Applications } from 'src/app/models/applications.model';
import { AdvertisementService } from 'src/app/models/services/advertisement.service';
import { ApplicationsService } from 'src/app/models/services/applications.service';
import { Advertisement } from '../../models/advertisement.model';

@Component({
  selector: 'app-single-advertisement',
  templateUrl: './single-advertisement.component.html',
  styleUrls: ['./single-advertisement.component.scss']
})
export class SingleAdvertisementComponent implements OnInit {

  @Input() advertisement!: any;

  // Event emitter to change the likes
  @Output() likesChanged = new EventEmitter<void>();
  @Output() deleteChange = new EventEmitter<void>();

  userRole!: any;

  userEmail!: string;
  companyName!: string;

  userID: any = localStorage.getItem('userID');

  constructor(
    private advService: AdvertisementService,
    private applicationService: ApplicationsService,
    private userService: AuthService,
    private router: Router
  ) {

  }

  likeAdvertisement(id: any): void {
    const advertisement: Advertisement = {
      id: id,
      title: this.advertisement.title,
      category: this.advertisement.category,
      type: this.advertisement.type,
      content: this.advertisement.content,
      company_name: this.advertisement.company_name,
      likes: this.advertisement.likes + 1
    }

    this.advService.putAdvertisement$(advertisement).subscribe({
      next: () => {
        // Emit when like successfully
        this.likesChanged.emit();
      },
      error: () => {
        console.log('Error occured when adding advertisement!!!')
      }
    })
  }

  // Method for job applications(for users only)
  applyJob(advTitle: any): void {
    const application: Applications = {
      user_email: this.userEmail,
      advertisement_title: advTitle,
      company_name: this.companyName,
      isApproved: false
    }

    this.applicationService.postApplication$(application).subscribe({
      next: () => {
        this.router.navigate(['/advertisements'])
      }
    })
  }

  // Method for deleting the advertisement (only for companies)
  deleteAdv(id: any): void {
    // Delete the user
    this.advService.deleteAdvertisement$(id).subscribe({
      next: () => {
        // Send emitter to reload advertisements when delete
        this.deleteChange.emit();
      }
    });
  }

  updateAdv(): void {
    this.router.navigate(['advertisement/update']);
  }

  ngOnInit(): void {
    // Get logged user name
    this.userService.getUser$(this.userID).subscribe({
      next: (response) => {
        this.userEmail = response.user.email;
      }
    })

    // Get the name of the compnay
    this.userService.getUser$(this.advertisement.company_name).subscribe({
      next: (response) => {
        this.companyName = response.user.name;
      }
    })

    this.userRole = localStorage.getItem('userRole');
  }

}
