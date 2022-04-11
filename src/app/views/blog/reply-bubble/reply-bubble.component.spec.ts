import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyBubbleComponent } from './reply-bubble.component';

describe('ReplyBubbleComponent', () => {
  let component: ReplyBubbleComponent;
  let fixture: ComponentFixture<ReplyBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
