import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetDonHangComponent } from './duyet-don-hang.component';

describe('DuyetDonHangComponent', () => {
  let component: DuyetDonHangComponent;
  let fixture: ComponentFixture<DuyetDonHangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetDonHangComponent]
    });
    fixture = TestBed.createComponent(DuyetDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
