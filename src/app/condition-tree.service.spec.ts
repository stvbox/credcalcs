import { TestBed, inject } from '@angular/core/testing';

import { ConditionTreeService } from './condition-tree.service';

describe('ConditionTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionTreeService]
    });
  });

  it('should be created', inject([ConditionTreeService], (service: ConditionTreeService) => {
    expect(service).toBeTruthy();
  }));
});
