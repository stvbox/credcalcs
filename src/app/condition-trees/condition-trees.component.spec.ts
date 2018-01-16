import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionTreesComponent } from './condition-trees.component';

describe('ConditionTreesComponent', () => {
  let component: ConditionTreesComponent;
  let fixture: ComponentFixture<ConditionTreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionTreesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
