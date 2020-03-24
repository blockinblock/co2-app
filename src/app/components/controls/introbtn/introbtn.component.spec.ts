import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrobtnComponent } from './introbtn.component';

describe('InfobtnComponent', () => {
  let component: IntrobtnComponent;
  let fixture: ComponentFixture<IntrobtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrobtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrobtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
