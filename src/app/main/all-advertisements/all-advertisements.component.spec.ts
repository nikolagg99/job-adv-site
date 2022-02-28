import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdvertisementsComponent } from './all-advertisements.component';

describe('AllAdvertisementsComponent', () => {
  let component: AllAdvertisementsComponent;
  let fixture: ComponentFixture<AllAdvertisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdvertisementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
