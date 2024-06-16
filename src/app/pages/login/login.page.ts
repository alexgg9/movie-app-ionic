import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  requestToken?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.handleLoginCallback();
    });
  }

  ngOnInit() {
    this.authService.getRequestToken().subscribe((data: any) => {
      this.requestToken = data.request_token;
    });
  }

  login(): void {
    const redirectUri = 'movies-app://callback';
    window.location.href = `https://www.themoviedb.org/authenticate/${this.requestToken}?redirect_to=${redirectUri}`;
  }

  handleLoginCallback(): void {
    const url = new URL(window.location.href);
    const requestToken = url.searchParams.get('request_token');
    if (requestToken) {
      this.authService.getAccessToken(requestToken).subscribe((data: any) => {
        const accessToken = data.session_id;
        console.log('Access Token:', accessToken);
        this.authService.storeSession(accessToken, data.account_id);
        this.router.navigate(['/tabs/tab1']);
      }, (error) => {
        console.error('Error al obtener el token de acceso:', error);
      });
    } else {
      console.error('No se encontró el token de sesión en la URL de retorno.');
    }
  }

}
