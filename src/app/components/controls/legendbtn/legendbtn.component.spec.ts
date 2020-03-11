import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendbtnComponent } from './legendbtn.component';

describe('LegendbtnComponent', () => {
  let component: LegendbtnComponent;
  let fixture: ComponentFixture<LegendbtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendbtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
