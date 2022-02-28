import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Advertisement } from '../../models/advertisement.model';
import { AdvertisementService } from '../../models/services/advertisement.service';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {

  formGroup!: FormGroup;

  // Data for the select boxes
  types = ['Part-Time', 'Full-Time', 'Remote'];
  categories = ['Office administration', 'Development'];

  // Getters for getting info from form group
  get titleFormControl() : FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get contentFormControl() : FormControl {
    return this.formGroup.get('content') as FormControl;
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private advertisementService: AdvertisementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      type: this.types[0],
      category: this.categories[0]
    });
  }

  onSubmit(): void {
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
    }
    
    if (!this.formGroup.invalid) {
      // Advertisement object
      const advertisement: Advertisement = {
        title: this.formGroup.get('title')?.value,
        category: this.formGroup.get('category')?.value,
        type: this.formGroup.get('type')?.value,
        content: this.formGroup.get('content')?.value,
        company_name: localStorage.getItem('userID') || 'test',
        likes: 0
      }
      ///////

      this.advertisementService.postAdvertisement$(advertisement).subscribe({
        next: () => {
          this.router.navigate(['/advertisements'])
        }
      });
    }

  }

}
