import { TestBed, inject } from '@angular/core/testing';

import { CargarImagenService } from './cargar-imagen.service';

describe('CargarImagenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargarImagenService]
    });
  });

  it('should be created', inject([CargarImagenService], (service: CargarImagenService) => {
    expect(service).toBeTruthy();
  }));
});
