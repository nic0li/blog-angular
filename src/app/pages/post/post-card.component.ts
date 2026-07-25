import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {

  @Input({ required: true })
  post!: PostViewResponse;

  @Input()
  showActions = false;

  @Output()
  delete = new EventEmitter<number>();

}
