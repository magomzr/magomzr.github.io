import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly postService = inject(PostService);
  posts = toSignal(this.postService.getAllPosts());
}
