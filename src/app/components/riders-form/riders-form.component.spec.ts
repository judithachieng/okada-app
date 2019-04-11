import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersFormComponent } from './riders-form.component';

describe('RidersFormComponent', () => {
  let component: RidersFormComponent;
  let fixture: ComponentFixture<RidersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
