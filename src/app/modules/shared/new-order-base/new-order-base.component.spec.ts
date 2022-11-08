import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderBaseComponent } from './new-order-base.component';

describe('NewOrderBaseComponent', () => {
  let component: NewOrderBaseComponent;
  let fixture: ComponentFixture<NewOrderBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
