import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Post } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('posts/index.json').pipe(catchError(() => of([])));
  }

  getPostById(id: string): Observable<Post | undefined> {
    return this.getAllPosts().pipe(map((posts) => posts.find((post) => post.id === id)));
  }
}
