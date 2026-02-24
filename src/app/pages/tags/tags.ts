import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostService } from '../../services/post.service';
import { Entry } from '../../components/entry/entry';
import { BackToPosts } from '../../components/back-to-posts/back-to-posts';

@Component({
  selector: 'app-tags',
  imports: [Entry, BackToPosts],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class Tags {
  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  readonly tag: string;
  posts = toSignal(this.postService.getPostByTag(this.route.snapshot.paramMap.get('tag') || ''), {
    initialValue: [],
  });

  constructor() {
    this.tag = this.route.snapshot.paramMap.get('tag') || '';
  }
}
