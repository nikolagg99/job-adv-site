import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Applications } from 'src/app/models/applications.model';
import { ApplicationsService } from 'src/app/models/services/applications.service';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss']
})
export class SingleCandidateComponent implements OnInit {

  @Input() application!: any;

  @Output() approveUpdate = new EventEmitter<void>();

  isApproved!: boolean;

  constructor(
    private applicationService: ApplicationsService
  ) { }

  ngOnInit(): void {
    
  }

  onApprove(id: any): void {
    if(this.application.isApproved){
      this.isApproved = false
    }else {
      this.isApproved = true
    }

    const application: Applications = {
      id: id,
      user_email: this.application.user_email,
      advertisement_title: this.application.advertisement_title,
      company_name: this.application.company_name,
      isApproved: true ? !this.application.isApproved : !this.application.isApproved
    }

    this.applicationService.putApplication$(application).subscribe({
      next: () => {
        this.approveUpdate.emit();
      }
    })
  }

}
