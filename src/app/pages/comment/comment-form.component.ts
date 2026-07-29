import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { CommentViewResponse } from '../../dto/comment/comment-view-response';
import { CommentCreateRequest } from '../../dto/comment/comment-create-request';
import { CommentUpdateRequest } from '../../dto/comment/comment-update-request';

@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {

  private readonly commentService = inject(CommentService);

  @Input({ required: true })
  postId!: number;

  @Input()
  comment: CommentViewResponse | null = null;

  @Output()
  saved = new EventEmitter<void>();

  @Output()
  cancelled = new EventEmitter<void>();

  saving = signal(false);

  content = signal('');

  get editing(): boolean {
    return this.comment !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment']) {
      if (this.comment) {
        this.content.set(this.comment.content);
      } else {
        this.clearForm();
      }
    }
  } 

  save(): void {
    if (!this.content().trim()) {
      alert('Comment is required.');
      return;
    }
    this.saving.set(true);
    if (this.editing) {
      const request: CommentUpdateRequest = {
        content: this.content().trim()
      };
      this.commentService.update(this.comment!.id, request).subscribe({
        next: () => {
          this.saving.set(false);
          this.saved.emit();
        },
        error: () => {
          console.error;
          this.saving.set(false);
        }
      });
    } else {
      const request: CommentCreateRequest = {
        content: this.content().trim(),
        postId: this.postId
      };
      this.commentService.create(request).subscribe({
        next: () => {
          this.saving.set(false);
          this.clearForm();
          this.saved.emit();
        },
        error: () => {
          console.error;
          this.saving.set(false);
        }
      });
    }
  }  

  cancel(): void {
    this.clearForm();
    this.cancelled.emit();
  }

  private clearForm(): void {
    this.content.set('');
  }

}
