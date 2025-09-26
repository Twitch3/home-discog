import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MusicbrainzApi } from '../../../services/musicbrainz-api/musicbrainz-api';
import { IArtistCredit, IReleaseList } from 'musicbrainz-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { take } from 'rxjs';
import { Album } from '../../../interfaces/Album';

@Component({
  selector: 'app-add-album-modal',
  imports: [FormsModule, CommonModule, MatTableModule, MatInputModule, MatPaginatorModule],
  templateUrl: './add-album-modal.html',
  styleUrl: './add-album-modal.scss'
})
export class AddAlbumModal {
  @Input() active = false;
  @Output() addedAlbum = new EventEmitter();

  public query: string = '';
  public selectedAlbum: any;
  public searchResults: MatTableDataSource<Album> = new MatTableDataSource();
  public displayedColumns: string[] = ['cover', 'title', 'artist', 'country', 'tracks', 'release_date', 'status'];
  public errorMsg: string | undefined;

  constructor(public mbAPI: MusicbrainzApi) { }

  public search() {
    this.mbAPI.searchMusicBrainzForAlbum(this.query).then(
      (results: IReleaseList) => {
        this.searchResults = new MatTableDataSource(results.releases as Album[]);
        this.fetchSearchResultCovers(results.releases);
        console.log(this.searchResults);
      },
      (error: any) => {
        this.errorMsg = error.toString();
      }
    )
  }

  public add(album: Album) {
    this.addedAlbum.emit(album)
  }

  public cancel() {
    this.active = false;
  }

  getArtistsString(artists: IArtistCredit[] | undefined): string {
    let artistsSTring: string = '';
    artists?.forEach((artist: IArtistCredit) => {
      artistsSTring += artist.name
      if (artist.joinphrase) {
        artistsSTring += ' ' + artist.joinphrase + ' '
      }
    });
    return artistsSTring;
  }

  fetchSearchResultCovers(searchResults: Album[]) {
    searchResults.forEach((releaseMatch: Album) => {
      this.mbAPI.getReleaseCoverArt(releaseMatch.id).pipe(take(1)).subscribe((data: any) => {
        releaseMatch.images = data.images;
      });
    });
  }
}
