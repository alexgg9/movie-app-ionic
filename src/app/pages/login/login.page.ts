import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  requestToken?: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getRequestToken().subscribe((data: any) => {
      this.requestToken = data.request_token;
    });
  }

  login(): void {
    const redirectUri = encodeURIComponent('http://localhost:8100/login/callback');
    window.location.href = `https://www.themoviedb.org/authenticate/${this.requestToken}?redirect_to=${redirectUri}`;
  }
  

  handleLoginCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    console.log('Request Token:', requestToken);
    if (requestToken) {
      this.authService.getAccessToken(requestToken).subscribe((data: any) => {
        const accessToken = data.session_id;
        console.log('Access Token:', accessToken);
        this.router.navigate(['/tabs/tab1']);
      }, (error) => {
        console.error('Error getting access token:', error);
      });
    }
  }
  
}
