import { Component, Output, EventEmitter, model, ChangeDetectionStrategy } from '@angular/core';
import { MusicbrainzApi } from '../../../services/musicbrainz-api/musicbrainz-api';
import { IArtistCredit, IReleaseList } from 'musicbrainz-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { take } from 'rxjs';
import { Album } from '../../../interfaces/Album';
import { CountryNamePipe } from '../../../pipes/country-name.pipe';

@Component({
  selector: 'app-add-album-modal',
  imports: [FormsModule, CommonModule, MatTableModule, MatInputModule, MatPaginatorModule, CountryNamePipe],
  templateUrl: './add-album-modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './add-album-modal.scss'
})
export class AddAlbumModal {
  public active = model<boolean>(false);
  @Output() albumAdded = new EventEmitter();

  public query: string = '';
  public selectedAlbum: Album | undefined;
  public searchResults: MatTableDataSource<Album> = new MatTableDataSource();
  public displayedColumns: string[] = ['cover', 'title', 'artist', 'country', 'tracks', 'release_date', 'status'];
  public errorMsg: string | undefined;

  constructor(public mbAPI: MusicbrainzApi) { }

  /**
   * Function that searches the mbAPI based on the current value of this.query
   */
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

  /**
   * Emits an addAlbum event when button is selected
   */
  public add() {
    if (this.selectedAlbum) {
      this.albumAdded.emit(this.selectedAlbum)
      this.cancel();
    }
  }

  /**
   * Closes modal and clears any current data
   */
  public cancel() {
    if (this.selectedAlbum) {
      this.selectedAlbum.selected = false;
      this.selectedAlbum = undefined;
    }

    this.searchResults = new MatTableDataSource();
    this.query = '';
    this.active.update(() => false)
  }

  public select(album: Album) {
    if (album.selected) {
      album.selected = false;
      this.selectedAlbum = undefined;
    } else {
      if (this.selectedAlbum) {
        this.selectedAlbum.selected = false;
      }
      album.selected = true;
      this.selectedAlbum = album;
    }
  }

  /**
   * Gets readable string for available artists in an array.
   */
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

  /**
   * Grabs cover art from the mbAPI for each album in a search result
   * @param searchResults
   */
  fetchSearchResultCovers(searchResults: Album[]) {
    searchResults.forEach((releaseMatch: Album) => {
      this.mbAPI.getReleaseCoverArt(releaseMatch.id).pipe(take(1)).subscribe((data: any) => {
        releaseMatch.images = data.images;
        if (data.images?.length > 0) {
          releaseMatch.image = data.images[0];
        }
      });
    });
  }
}
