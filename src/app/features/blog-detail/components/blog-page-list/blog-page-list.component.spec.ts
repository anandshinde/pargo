import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPageListComponent } from './blog-page-list.component';

describe('BlogPageListComponent', () => {
  let component: BlogPageListComponent;
  let fixture: ComponentFixture<BlogPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
