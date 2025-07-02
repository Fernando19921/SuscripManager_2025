import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPromocinesComponent } from './config-promocines.component';

describe('ConfigPromocinesComponent', () => {
  let component: ConfigPromocinesComponent;
  let fixture: ComponentFixture<ConfigPromocinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigPromocinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPromocinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
