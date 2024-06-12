import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { Movie } from 'src/app/models/movie';



@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class MovieListComponent  implements OnInit {
  @Input() movies?: Movie[];
  @Input() title? : string;
  constructor(private http: HttpClient) {
        addIcons({ star});
   }

  ngOnInit() {}


}
