import { TestBed, inject } from '@angular/core/testing';

import { EleccionService } from './eleccion.service';

describe('EleccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EleccionService]
    });
  });

  it('should ...', inject([EleccionService], (service: EleccionService) => {
    expect(service).toBeTruthy();
  }));
});
