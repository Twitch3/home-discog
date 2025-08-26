import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscsView } from './discs-view';

describe('DiscsView', () => {
  let component: DiscsView;
  let fixture: ComponentFixture<DiscsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
