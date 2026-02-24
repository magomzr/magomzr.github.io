import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Entry } from './entry';

describe('Entry', () => {
  let component: Entry;
  let fixture: ComponentFixture<Entry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entry],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Entry);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('post', {
      id: '1',
      title: 'Test',
      body: '<p>Test</p>',
      summary: 'Summary',
      createdAt: '2024-01-01',
      tags: ['test'],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
