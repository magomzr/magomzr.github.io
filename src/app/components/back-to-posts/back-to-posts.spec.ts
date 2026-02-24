import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToPosts } from './back-to-posts';

describe('BackToPosts', () => {
  let component: BackToPosts;
  let fixture: ComponentFixture<BackToPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToPosts],
    }).compileComponents();

    fixture = TestBed.createComponent(BackToPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
