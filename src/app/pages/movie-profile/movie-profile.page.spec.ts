import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieProfilePage } from './movie-profile.page';

describe('MovieProfilePage', () => {
  let component: MovieProfilePage;
  let fixture: ComponentFixture<MovieProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
