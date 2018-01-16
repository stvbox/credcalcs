import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionWayComponent } from './condition-way.component';

describe('ConditionWayComponent', () => {
  let component: ConditionWayComponent;
  let fixture: ComponentFixture<ConditionWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
