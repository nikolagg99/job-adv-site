import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Advertisement } from 'src/app/models/advertisement.model';
import { AdvertisementService } from 'src/app/models/services/advertisement.service';

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.scss']
})
export class UpdateAdvertisementComponent implements OnInit {

  advertisement!: any;
  formGroup!: FormGroup;

  // Data for the select boxes
  types = ['Part-Time', 'Full-Time', 'Remote'];
  categories = ['Office administration', 'Development'];

  // Getters for getting info from form group
  get titleFormControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get contentFormControl(): FormControl {
    return this.formGroup.get('content') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private advertisementService: AdvertisementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.advertisement = {
      title: '',
      category: '',
      type: '',
      content: '',
      company_name: '',
      likes: 0
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.advertisementService.getAdvertisement$(params['id']);
        }

        return of(null)
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.advertisement = response!.advertisement;

          this.initForm();
        }
      }
    })
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [this.advertisement.title, [Validators.required]],
      content: [this.advertisement.content, [Validators.required]],
      type: [this.advertisement.type],
      category: [this.advertisement.category]
    });
  }

  onUpdate(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    if (this.formGroup.valid) {
      const advertisement: Advertisement = {
        id: this.advertisement._id,
        title: this.formGroup.get('title')?.value,
        category: this.formGroup.get('category')?.value,
        type: this.formGroup.get('type')?.value,
        content: this.formGroup.get('content')?.value,
        company_name: localStorage.getItem('userID')!,
        likes: 0
      }

      this.advertisementService.putAdvertisement$(advertisement).subscribe({
        next: () => {
          this.router.navigate(['advertisements']);
        },
        error: () => {
          console.log('Error occured')
        }
      })
    }


  }

}
