import { TestBed, inject } from '@angular/core/testing';

import { VotacionService } from './votacion.service';

describe('VotacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotacionService]
    });
  });

  it('should ...', inject([VotacionService], (service: VotacionService) => {
    expect(service).toBeTruthy();
  }));
});
