import { TestBed } from '@angular/core/testing';

import { CitaLibroService } from './cita-libro.service';

describe('CitaLibroService', () => {
  let service: CitaLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
