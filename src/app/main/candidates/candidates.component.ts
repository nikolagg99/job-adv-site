import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Applications } from 'src/app/models/applications.model';
import { ApplicationsService } from 'src/app/models/services/applications.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  applications!: Applications[];
  companyName!: any;
  companyID!: any;

  constructor(
    private applicationService: ApplicationsService,
    private userService: AuthService
  ) {
    this.companyID = localStorage.getItem('userID')
  }

  update(): any {
    this.getApplications();
  }

  ngOnInit(): void {
    this.userService.getUser$(this.companyID).subscribe({
      next: (response) => {
        this.companyName = response.user.name
      }
    })

    this.getApplications()

  }

  private getApplications(): void {
    // get all applications
    this.applicationService.getApplications$().subscribe({
      next: (response: any) => {
        this.applications = response.applications
      }
    })
  }

}
