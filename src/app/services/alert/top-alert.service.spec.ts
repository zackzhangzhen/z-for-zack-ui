import { TestBed } from '@angular/core/testing';

import { TopAlertService } from './top-alert.service';

describe('TopAlertService', () => {
  let service: TopAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
