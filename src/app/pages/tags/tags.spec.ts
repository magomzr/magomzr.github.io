import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Tags } from './tags';

describe('Tags', () => {
  let component: Tags;
  let fixture: ComponentFixture<Tags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tags],
      providers: [
        provideRouter([{ path: 'tags/:tag', component: Tags }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tags);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
