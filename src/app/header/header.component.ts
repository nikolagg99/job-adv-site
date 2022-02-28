import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userRole!: any;
  isLogged!: boolean;
  userID!: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.userID = localStorage.getItem('userID');
    
    if(localStorage.getItem('userToken')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

}
