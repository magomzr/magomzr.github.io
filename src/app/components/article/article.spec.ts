import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Article } from './article';

describe('Article', () => {
  let component: Article;
  let fixture: ComponentFixture<Article>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Article],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Article);
    component = fixture.componentInstance;
    component.post = {
      id: '1',
      title: 'Test',
      body: '<p>Test</p>',
      summary: 'Summary',
      createdAt: '2024-01-01',
      tags: ['test'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
