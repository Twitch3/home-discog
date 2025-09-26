import { TestBed } from '@angular/core/testing';

import { MusicbrainzApi } from './musicbrainz-api';

describe('MusicbrainzApi', () => {
  let service: MusicbrainzApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicbrainzApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
