import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSpaceComponent } from './blog-space.component';

describe('BlogSpaceComponent', () => {
  let component: BlogSpaceComponent;
  let fixture: ComponentFixture<BlogSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
