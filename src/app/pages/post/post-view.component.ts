import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { PostService } from '../../services/post.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PostFormComponent } from './post-form.component';

@Component({
  selector: 'app-post-view',
  imports: [CommonModule, RouterLink, DatePipe, PostFormComponent],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css',
})
export class PostViewComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);

  post = signal<PostViewResponse | null>(null);
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
      error: error => {
        console.error(error);
        this.loading.set(false);
      },
    });
  }

  editPost(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    console.log('CLOSE');
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

}
