import { Component, inject, OnInit } from '@angular/core';
import { Album } from '../../../../../../shared/interfaces/Album';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class DiscsView implements OnInit {
  public discs: IRelease[] = [];
  public testAPI: string = 'test';
  public showAddModal: boolean = false;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const type: string = params['type'];
      this.http.get('http://localhost:3344/library', { params: { type: type }, headers: { 'Content-Type': 'application/json' } }).subscribe((data: any) => {
        this.testAPI = data.msg.toString();
        console.log(data);
      });
    });
  }

  public addAlbum() {

    this.showAddModal = true;
  }

  public albumAdded(album: Album) {
    console.log(album);
    this.http.post('http://localhost:3344/album', album).subscribe((res: any) => {
      console.log(res);
    })
  }
}
