import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {

  private readonly authorizationService = inject(AuthorizationService);

  @Input({ required: true })
  post!: PostViewResponse;

  @Input()
  showActions = false;

  @Output()
  edit = new EventEmitter<PostViewResponse>();

  @Output()
  delete = new EventEmitter<number>();

  get canEdit(): boolean {
    return this.authorizationService.canEdit(this.post.user.id);
  }

  get canDelete(): boolean {
    return this.authorizationService.canDelete(this.post.user.id);
  }

}
