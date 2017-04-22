import { TestBed, inject } from '@angular/core/testing';

import { CandidatoService } from './candidato.service';

describe('CandidatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatoService]
    });
  });

  it('should ...', inject([CandidatoService], (service: CandidatoService) => {
    expect(service).toBeTruthy();
  }));
});
