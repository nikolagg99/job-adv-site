import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAdvertisementComponent } from './single-advertisement.component';

describe('SingleAdvertisementComponent', () => {
  let component: SingleAdvertisementComponent;
  let fixture: ComponentFixture<SingleAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAdvertisementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
