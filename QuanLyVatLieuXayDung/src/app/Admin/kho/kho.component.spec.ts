import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoComponent } from './kho.component';

describe('KhoComponent', () => {
  let component: KhoComponent;
  let fixture: ComponentFixture<KhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhoComponent]
    });
    fixture = TestBed.createComponent(KhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
