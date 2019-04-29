import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCardComponent } from './computer-card.component';

describe('ComputerCardComponent', () => {
  let component: ComputerCardComponent;
  let fixture: ComponentFixture<ComputerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
