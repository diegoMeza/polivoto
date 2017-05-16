import { TestBed, inject } from '@angular/core/testing';

import { ObtenerIpService } from './obtener-ip.service';

describe('ObtenerIpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtenerIpService]
    });
  });

  it('should ...', inject([ObtenerIpService], (service: ObtenerIpService) => {
    expect(service).toBeTruthy();
  }));
});
