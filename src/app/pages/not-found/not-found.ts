import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackToPosts } from '../../components/back-to-posts/back-to-posts';

@Component({
  selector: 'app-not-found',
  imports: [BackToPosts],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('404 - /home/mago');
  }
}
