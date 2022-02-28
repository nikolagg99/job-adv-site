import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Advertisement } from 'src/app/models/advertisement.model';
import { AdvertisementService } from 'src/app/models/services/advertisement.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  user!: any;
  formGroup!: FormGroup;
  allAdvertisements!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: AuthService,
    private router: Router,
    private advService: AdvertisementService
  ) {
    this.user = {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  }

  // Getters for getting info from form group
  get nameFormControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  // Function for submitting the changes
  onUpdate(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    if (this.formGroup.valid) {
      // User object
      const user: User = {
        id: this.formGroup.value.id,
        name: this.formGroup.get('name')?.value,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value,
        role: this.formGroup.get('role')?.value
      }
      /////////

      this.userService.putUser$(user).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          console.log('Error occured')
        }
      });
      /////////////////
    }
  }

  // Function for deleting user
  onDelete(): void {
    // delete the user from the database
    this.userService.deleteUser$(this.user._id).subscribe();

    // Logout when user is deleted
    this.userService.logout();

    // Navigate to login
    this.router.navigate(['/'])

    // Get all of the advertisements of the company and delete it when delete profile
    for(let adv of this.allAdvertisements){
      if(this.user._id === adv.company_name) {
        this.advService.deleteAdvertisement$(adv._id).subscribe({
          next: () => {
            console.log('done')
          }
        })
      }
    }
  }

  // Initialization of the form group
  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      id: this.user._id,
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  // method for getting all the adds
  private getAdds(): void {
    this.advService.getAdvertisements$().subscribe({
      next: (response: any) => {
        this.allAdvertisements = response.advertisements
      }
    })
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.userService.getUser$(params['id'])
        }

        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.user = response!.user;

          this.initForm();
        }
      }
    });

    this.initForm()
    this.getAdds();
  }

}
