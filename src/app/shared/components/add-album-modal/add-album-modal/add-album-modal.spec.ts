import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumModal } from './add-album-modal';

describe('AddAlbumModal', () => {
  let component: AddAlbumModal;
  let fixture: ComponentFixture<AddAlbumModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlbumModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlbumModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
