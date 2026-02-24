import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../../types';
import { Article } from '../../components/article/article';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-post',
  imports: [Article, Footer],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  readonly id: string;
  post: Signal<Post | undefined>;

  constructor() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.post = toSignal(this.postService.getPostById(this.id));
  }
}
