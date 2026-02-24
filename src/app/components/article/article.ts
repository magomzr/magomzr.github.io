import { Component, Input } from '@angular/core';
import { Post } from '../../types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [DatePipe, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  @Input() post!: Post;
}
