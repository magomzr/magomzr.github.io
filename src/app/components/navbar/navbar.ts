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
      path: '/',
      title: '/home',
    },
    {
      path: 'mailto:mariogomezarr@gmail.com',
      title: '/email',
      url: true,
    },
    {
      path: 'https://www.linkedin.com/in/mariogomeza/',
      title: '/linkedin',
      url: true,
    },
    {
      path: 'https://github.com/magomzr',
      title: '/github',
      url: true,
    },
  ];
}
