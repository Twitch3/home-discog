import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscDetailsView } from './disc-details-view';

describe('DiscDetailsView', () => {
  let component: DiscDetailsView;
  let fixture: ComponentFixture<DiscDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscDetailsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
