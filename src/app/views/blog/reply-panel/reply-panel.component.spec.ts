import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyPanelComponent } from './reply-panel.component';

describe('ReplyPanelComponent', () => {
  let component: ReplyPanelComponent;
  let fixture: ComponentFixture<ReplyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
