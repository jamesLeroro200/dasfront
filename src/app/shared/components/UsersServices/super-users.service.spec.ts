import { TestBed } from '@angular/core/testing';

import { SuperUsersService } from './super-users.service';

describe('SuperUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperUsersService = TestBed.get(SuperUsersService);
    expect(service).toBeTruthy();
  });
});
