import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { map } from 'rxjs';

export const postExistsGuard: CanActivateFn = (route) => {
  const postService = inject(PostService);
  const router = inject(Router);
  const id = route.paramMap.get('id') || '';

  return postService
    .getPostById(id)
    .pipe(map((post) => (post ? true : router.createUrlTree(['/not-found']))));
};
