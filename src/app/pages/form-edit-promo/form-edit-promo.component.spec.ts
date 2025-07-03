import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPromoComponent } from './form-edit-promo.component';

describe('FormEditPromoComponent', () => {
  let component: FormEditPromoComponent;
  let fixture: ComponentFixture<FormEditPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditPromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
