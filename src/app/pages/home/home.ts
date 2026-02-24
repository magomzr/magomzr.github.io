import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostService } from '../../services/post.service';
import { Entry } from '../../components/entry/entry';

@Component({
  selector: 'app-home',
  imports: [Entry],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly postService = inject(PostService);
  posts = toSignal(this.postService.getAllPosts(), { initialValue: [] });
}
