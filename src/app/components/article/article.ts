import { Component, Input } from '@angular/core';
import { Post } from '../../types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [DatePipe],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  @Input() post!: Post;
}
