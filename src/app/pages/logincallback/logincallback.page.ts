import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logincallback',
  templateUrl: './logincallback.page.html',
  styleUrls: ['./logincallback.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LogincallbackPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const requestToken = params['request_token'];
      if (requestToken) {
        this.authService.getAccessToken(requestToken).subscribe((data: any) => {
          this.authService.storeSession(data.session_id, data.account_id);
          this.router.navigate(['/tabs/tab1']);
        });
      } else {
        console.error('No request token available.');
      }
    });
  }
}

