import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    // login request
    if (this.formGroup.valid) {
      const user = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      }

      this.authService.login$(user).subscribe({
        next: (response: any) => {
          if (response) {
            // store data - local storage
            this.authService.storeUserToken(response);
            this.authService.storeUserRole(response.user.role);
            this.authService.storeUserID(response.user._id);
            location.reload()
            // navigate inside system
            this.router.navigate(['/']);
          }
        },
        error: () => {
          console.log('There is no user with such parameters')
        }
      });
    }
  }
}
