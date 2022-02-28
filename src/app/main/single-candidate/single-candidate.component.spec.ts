import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCandidateComponent } from './single-candidate.component';

describe('SingleCandidateComponent', () => {
  let component: SingleCandidateComponent;
  let fixture: ComponentFixture<SingleCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
