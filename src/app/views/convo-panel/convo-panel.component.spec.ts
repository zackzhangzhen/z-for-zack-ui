import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoPanelComponent } from './convo-panel.component';

describe('ConvoPanelComponent', () => {
  let component: ConvoPanelComponent;
  let fixture: ComponentFixture<ConvoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvoPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
