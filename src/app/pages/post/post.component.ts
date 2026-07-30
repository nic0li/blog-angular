import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommentCardComponent } from '../../components/comment/comment-card.component';
import { CommentFormComponent } from '../../components/comment/comment-form.component';
import { PostFormComponent } from '../../components/post/post-form.component';
import { PostResponse } from '../../models/post-response';
import { AuthorizationService } from '../../services/authorization.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  imports: [CommonModule, RouterLink, DatePipe, PostFormComponent, CommentCardComponent, CommentFormComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);
  private readonly authorizationService = inject(AuthorizationService);

  post = signal<PostResponse | null>(null);
  loading = signal(true);
  showForm = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPost(id);
  }

  private loadPost(id: number): void {
    this.loading.set(true);
    this.postService.findById(id).subscribe({
      next: response => {
        this.post.set(response);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  editPost(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  postSaved(): void {
    this.showForm.set(false);
    this.loadPost(this.post()!.id);
  }

  deletePost(): void {
    const currentPost = this.post();
    if (!currentPost) {
      return;
    }
    if (!confirm('Delete this post?')) {
      return;
    }
    this.postService.delete(currentPost.id).subscribe({
      next: () => this.router.navigate(['/home']),
      error: console.error
    });
  }

  get canEdit(): boolean {
    const post = this.post();
    return !!post &&
      this.authorizationService.canEdit(post.user.id);
  }

  get canDelete(): boolean {
    const post = this.post();
    return !!post &&
      this.authorizationService.canDelete(post.user.id);
  }

  commentSaved(): void {
    this.loadPost(this.post()!.id);
  }

  commentDeleted(): void {
    this.loadPost(this.post()!.id);
  }

}
