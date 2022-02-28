import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles = ['user', 'company'];

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private router: Router
  ) { }

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

  onSubmit() {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }

    if(this.formGroup.valid){
      // User object
      const user: User = {
        name: this.formGroup.get('name')?.value,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value,
        role: this.formGroup.get('role')?.value
      }
      /////////

      //console.log(user)
      this.userService.register$(user).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: () => {
          console.log('Error occured')
        }
      });

      /////////////////
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: 'user'
    });
  }

}
