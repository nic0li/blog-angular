import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostViewResponse } from '../../../dto/post/post-view-response';
import { PostService } from '../../../services/post.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css',
})
export class PostViewComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);

  post?: PostViewResponse;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPost(id);
  }

  private loadPost(id: number): void {
    this.loading = true;
    this.postService.findById(id).subscribe({
      next: response => {
        this.post = response;
        this.loading = false;
      },
      error: error => {
        console.error(error);
        this.loading = false;
      },
    });

  }

  editPost(): void {
    // TODO
    // abrir modal usando PostFormComponent
  }

  deletePost(): void {
    if (!this.post) {
      return;
    }
    if (!confirm('Delete this post?')) {
      return;
    }
    this.postService.delete(this.post.id).subscribe({
      next: () => this.router.navigate(['/home']),
      error: console.error
    });
  }

}
