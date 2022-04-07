import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopAlertComponent } from './add-top-alert.component';

describe('AddTopAlertComponent', () => {
  let component: AddTopAlertComponent;
  let fixture: ComponentFixture<AddTopAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
