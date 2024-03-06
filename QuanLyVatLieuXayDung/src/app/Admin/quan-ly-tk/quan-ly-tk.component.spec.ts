import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTKComponent } from './quan-ly-tk.component';

describe('QuanLyTKComponent', () => {
  let component: QuanLyTKComponent;
  let fixture: ComponentFixture<QuanLyTKComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyTKComponent]
    });
    fixture = TestBed.createComponent(QuanLyTKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
