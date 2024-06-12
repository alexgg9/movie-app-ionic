import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logincallback',
  templateUrl: './logincallback.page.html',
  styleUrls: ['./logincallback.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LogincallbackPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.handleLoginCallback();
  }

  handleLoginCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    if (requestToken) {
      this.authService.getAccessToken(requestToken).subscribe((data: any) => {
        const sessionId = data.session_id;
        this.authService.getAccountId(sessionId).subscribe((accountData: any) => {
          const accountId = accountData.id;
          this.authService.storeSession(sessionId, accountId.toString());
          this.router.navigate(['/tabs/tab1']);
        }, (error) => {
          console.error('Error getting account ID:', error);
        });
      }, (error) => {
        console.error('Error getting access token:', error);
      });
    }
  }

}
