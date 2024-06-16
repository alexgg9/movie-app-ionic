import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('appUrlOpen', (data: any) => {
        if (data.url.includes('request_token')) {
          const url = new URL(data.url);
          const requestToken = url.searchParams.get('request_token');
          if (requestToken) {
            this.router.navigate(['/login/callback'], { queryParams: { request_token: requestToken } });
          }
        }
      });
    });
  }
}
