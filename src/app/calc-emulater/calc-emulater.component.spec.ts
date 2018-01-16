import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcEmulaterComponent } from './calc-emulater.component';

describe('CalcEmulaterComponent', () => {
  let component: CalcEmulaterComponent;
  let fixture: ComponentFixture<CalcEmulaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcEmulaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcEmulaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
