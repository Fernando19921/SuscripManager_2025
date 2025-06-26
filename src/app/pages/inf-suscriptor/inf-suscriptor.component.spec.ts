import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfSuscriptorComponent } from './inf-suscriptor.component';

describe('InfSuscriptorComponent', () => {
  let component: InfSuscriptorComponent;
  let fixture: ComponentFixture<InfSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfSuscriptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
