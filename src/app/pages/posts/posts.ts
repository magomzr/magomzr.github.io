import { Component, inject, Signal, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../../types';
import { Article } from '../../components/article/article';
import { BackToPosts } from '../../components/back-to-posts/back-to-posts';

@Component({
  selector: 'app-post',
  imports: [Article, BackToPosts],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  private readonly titleService = inject(Title);
  readonly slug: string;
  post: Signal<Post | undefined>;

  constructor() {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.post = toSignal(this.postService.getPostBySlug(this.slug));

    effect(() => {
      const currentPost = this.post();
      if (currentPost) {
        this.titleService.setTitle(currentPost.title);
      }
    });
  }
}
