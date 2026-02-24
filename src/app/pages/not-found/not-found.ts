import { Component } from '@angular/core';
import { BackToPosts } from '../../components/back-to-posts/back-to-posts';

@Component({
  selector: 'app-not-found',
  imports: [BackToPosts],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
