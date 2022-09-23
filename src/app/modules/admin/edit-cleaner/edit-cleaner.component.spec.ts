import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCleanerComponent } from './edit-cleaner.component';

describe('EditCleanerComponent', () => {
  let component: EditCleanerComponent;
  let fixture: ComponentFixture<EditCleanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCleanerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
