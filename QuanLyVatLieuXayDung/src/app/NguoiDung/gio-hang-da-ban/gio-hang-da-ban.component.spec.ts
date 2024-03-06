import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GioHangDaBanComponent } from './gio-hang-da-ban.component';

describe('GioHangDaBanComponent', () => {
  let component: GioHangDaBanComponent;
  let fixture: ComponentFixture<GioHangDaBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GioHangDaBanComponent]
    });
    fixture = TestBed.createComponent(GioHangDaBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
