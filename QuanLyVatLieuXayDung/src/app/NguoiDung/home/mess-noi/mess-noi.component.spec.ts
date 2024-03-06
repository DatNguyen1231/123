import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessNoiComponent } from './mess-noi.component';

describe('MessNoiComponent', () => {
  let component: MessNoiComponent;
  let fixture: ComponentFixture<MessNoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessNoiComponent]
    });
    fixture = TestBed.createComponent(MessNoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
