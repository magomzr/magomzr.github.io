import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostService } from '../../services/post.service';
import { Entry } from '../../components/entry/entry';

@Component({
  selector: 'app-home',
  imports: [Entry],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly postService = inject(PostService);
  private readonly titleService = inject(Title);
  posts = toSignal(this.postService.getAllPosts(), { initialValue: [] });

  ngOnInit() {
    this.titleService.setTitle('/home/mago');
  }
}
