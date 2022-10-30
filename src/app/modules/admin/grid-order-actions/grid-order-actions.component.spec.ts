import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOrderActionsComponent } from './grid-order-actions.component';

describe('GridOrderActionsComponent', () => {
  let component: GridOrderActionsComponent;
  let fixture: ComponentFixture<GridOrderActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridOrderActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridOrderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
