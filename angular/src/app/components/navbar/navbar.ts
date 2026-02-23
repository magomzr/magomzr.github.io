import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  routes = [
    {
      path: '/home',
      title: '/home',
    },
    {
      path: '/email',
      title: '/email',
    },
    {
      path: '/linkedin',
      title: '/linkedin',
    },
  ];
}
