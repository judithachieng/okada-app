import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderDetailsComponent } from './rider-details.component';

describe('RiderDetailsComponent', () => {
  let component: RiderDetailsComponent;
  let fixture: ComponentFixture<RiderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
