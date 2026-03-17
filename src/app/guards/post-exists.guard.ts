import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { map } from 'rxjs';

export const postExistsGuard: CanActivateFn = (route) => {
  const postService = inject(PostService);
  const router = inject(Router);
  const slug = route.paramMap.get('slug') || '';

  return postService
    .getPostBySlug(slug)
    .pipe(map((post) => (post ? true : router.createUrlTree(['/not-found']))));
};
