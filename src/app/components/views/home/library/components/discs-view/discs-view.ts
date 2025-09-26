import { Component } from '@angular/core';
import { Album } from '../../../../../../shared/interfaces/Album';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddAlbumModal } from '../../../../../../shared/components/add-album-modal/add-album-modal/add-album-modal';
import { CommonModule } from '@angular/common';
import { IRelease } from 'musicbrainz-api';

@Component({
  selector: 'app-discs-view',
  imports: [RouterLink, CommonModule, AddAlbumModal],
  templateUrl: './discs-view.html',
  styleUrl: './discs-view.scss'
})
export class DiscsView {
  public discs: IRelease[] = [];
  public testAPI: string = 'test';
  constructor(private http: HttpClient) {
    const testAlbum: IRelease = {
      id: '1',
      title: 'Test',
      country: '',
      date: '',
      collections: [],
      media: [],
      status: 'Official',
      packaging: 'Book',
      quality: 'normal',
      relations: [],
      'text-representation': {
        language: '',
        script: ''
      },
      disambiguation: '',
      asin: null,
      'status-id': '',
      'cover-art-archive': {
        count: 0,
        front: false,
        darkened: false,
        artwork: false,
        back: false
      },
      barcode: ''
    }

    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
    this.discs.push(testAlbum);
  }

  public addAlbum() {
    this.http.get('http://localhost:3344/library').subscribe((data: any) => this.testAPI = data.msg.toString());
  }
}
