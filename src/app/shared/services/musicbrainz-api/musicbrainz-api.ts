import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoverArtArchiveApi, IReleaseList, MusicBrainzApi } from 'musicbrainz-api';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicbrainzApi {
  private api: MusicBrainzApi;
  private coverArtAPI: CoverArtArchiveApi;
  constructor(private http: HttpClient) {
    this.api = new MusicBrainzApi({
      appName: 'home-discog',
      appVersion: '0.0.1',
      appContactInfo: 'claunch3@gmail.com',
    });
    this.coverArtAPI = new CoverArtArchiveApi();
  }

  public searchMusicBrainzForAlbum(query: string): Promise<IReleaseList> {
    return this.api.search('release', { query: query });
  }

  public getReleaseCoverArt(releaseId: string): Observable<object> {
    return this.http.get('https://coverartarchive.org/release/' + releaseId);
  }
}
