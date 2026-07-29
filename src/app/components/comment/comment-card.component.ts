import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommentFormComponent } from './comment-form.component';
import { CommentResponse } from '../../models/comment-response';
import { AuthorizationService } from '../../services/authorization.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule, DatePipe, CommentFormComponent],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {

  private readonly authorizationService = inject(AuthorizationService);
  private readonly commentService = inject(CommentService);

  @Input({ required: true })
  comment!: CommentResponse;

  @Input({ required: true })
  postId!: number;

  @Output()
  updated = new EventEmitter<void>();

  @Output()
  deleted = new EventEmitter<void>();

  editing = signal(false);

  get canEdit(): boolean {
    return this.authorizationService.canEdit(this.comment.user.id);
  }

  get canDelete(): boolean {
    return this.authorizationService.canDelete(this.comment.user.id);
  }

  edit(): void {
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  commentSaved(): void {
    this.editing.set(false);
    this.updated.emit();
  }

  delete(): void {
    if (!confirm('Delete this comment?')) {
      return;
    }
    this.commentService.delete(this.comment.id).subscribe({
      next: () => this.deleted.emit(),
      error: console.error
    });
  }  

}
