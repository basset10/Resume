import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkMeetupsDescComponent } from './park-meetups-desc.component';

describe('ParkMeetupsDescComponent', () => {
  let component: ParkMeetupsDescComponent;
  let fixture: ComponentFixture<ParkMeetupsDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkMeetupsDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkMeetupsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
