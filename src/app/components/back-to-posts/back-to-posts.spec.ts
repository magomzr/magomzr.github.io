import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BackToPosts } from './back-to-posts';

describe('BackToPosts', () => {
  let component: BackToPosts;
  let fixture: ComponentFixture<BackToPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToPosts],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BackToPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
