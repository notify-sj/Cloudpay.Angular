import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAccessComponent } from './assignment-access.component';

describe('AssignmentAccessComponent', () => {
  let component: AssignmentAccessComponent;
  let fixture: ComponentFixture<AssignmentAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentAccessComponent]
    });
    fixture = TestBed.createComponent(AssignmentAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
