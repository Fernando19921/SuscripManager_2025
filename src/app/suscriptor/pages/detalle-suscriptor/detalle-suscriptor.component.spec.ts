import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSuscriptorComponent } from './detalle-suscriptor.component';

describe('DetalleSuscriptorComponent', () => {
  let component: DetalleSuscriptorComponent;
  let fixture: ComponentFixture<DetalleSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleSuscriptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
