import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { PostService } from './post.service';
import { Post } from '../types';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Test Post',
      body: '<p>Test</p>',
      summary: 'Summary',
      createdAt: '2024-01-01',
      tags: ['test', 'angular'],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all posts', async () => {
    const postsPromise = firstValueFrom(service.getAllPosts());

    const req = httpMock.expectOne('posts/index.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    const posts = await postsPromise;
    expect(posts).toEqual(mockPosts);
  });

  it('should get post by id', async () => {
    const postPromise = firstValueFrom(service.getPostById('1'));

    const req = httpMock.expectOne('posts/index.json');
    req.flush(mockPosts);

    const post = await postPromise;
    expect(post).toEqual(mockPosts[0]);
  });

  it('should get posts by tag', async () => {
    const postsPromise = firstValueFrom(service.getPostByTag('test'));

    const req = httpMock.expectOne('posts/index.json');
    req.flush(mockPosts);

    const posts = await postsPromise;
    expect(posts.length).toBe(1);
    expect(posts[0].tags).toContain('test');
  });
});
