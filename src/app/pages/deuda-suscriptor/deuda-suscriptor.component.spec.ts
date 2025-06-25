import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudaSuscriptorComponent } from './deuda-suscriptor.component';

describe('DeudaSuscriptorComponent', () => {
  let component: DeudaSuscriptorComponent;
  let fixture: ComponentFixture<DeudaSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudaSuscriptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudaSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
