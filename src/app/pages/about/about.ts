import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('About - /home/mago');
  }
}
