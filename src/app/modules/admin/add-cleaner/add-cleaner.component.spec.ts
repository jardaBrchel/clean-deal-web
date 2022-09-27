import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCleanerComponent } from './add-cleaner.component';

describe('AddCleanerComponent', () => {
  let component: AddCleanerComponent;
  let fixture: ComponentFixture<AddCleanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCleanerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
