import { Component, OnInit } from '@angular/core';
import { Applications } from 'src/app/models/applications.model';
import { ApplicationsService } from 'src/app/models/services/applications.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {

  applications!: Applications[];

  constructor(
    private applicationService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.applicationService.getApplications$().subscribe({
      next: (response: any) => {
        this.applications = response.applications
      }
    })
  }

}
