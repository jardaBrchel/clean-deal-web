import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerDetailComponent } from './cleaner-detail.component';

describe('CleanerDetailComponent', () => {
  let component: CleanerDetailComponent;
  let fixture: ComponentFixture<CleanerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
