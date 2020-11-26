import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerNameComponent } from './computer-name.component';

describe('ComputerNameComponent', () => {
  let component: ComputerNameComponent;
  let fixture: ComponentFixture<ComputerNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
