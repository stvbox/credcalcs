import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionConvasComponent } from './condition-convas.component';

describe('ConditionConvasComponent', () => {
  let component: ConditionConvasComponent;
  let fixture: ComponentFixture<ConditionConvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionConvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionConvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
