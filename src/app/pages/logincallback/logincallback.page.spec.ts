import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogincallbackPage } from './logincallback.page';

describe('LogincallbackPage', () => {
  let component: LogincallbackPage;
  let fixture: ComponentFixture<LogincallbackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
