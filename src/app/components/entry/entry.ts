import { Component, input } from '@angular/core';
import { Post } from '../../types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entry',
  imports: [DatePipe, RouterLink],
  templateUrl: './entry.html',
  styleUrl: './entry.css',
})
export class Entry {
  post = input.required<Post>();
}
