import { TestBed } from '@angular/core/testing';

import { MarcaLibroService } from './marca-libro.service';

describe('MarcaLibroService', () => {
  let service: MarcaLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
