import { TestBed } from '@angular/core/testing';

import { SuscriptoresService } from './suscriptores.service';

describe('SuscriptoresService', () => {
  let service: SuscriptoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscriptoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
