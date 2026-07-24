import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryResponse } from '../../dto/category/category-response';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PostCardComponent } from './card/post-card.component';

@Component({
  selector: 'app-post',
  imports: [CommonModule, FormsModule, PostCardComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnChanges {

  private readonly postService = inject(PostService);
  private readonly userService = inject(UserService);
  private readonly categoryService = inject(CategoryService);

  @Input({ required: true })
  mode!: 'all' | 'mine' | 'category';

  posts: PostViewResponse[] = [];
  categories: CategoryResponse[] = [];
  selectedCategory = '';

ngOnChanges(changes: SimpleChanges): void {
  if (changes['mode']) {
    this.load();
  }
}

  private load(): void {
    switch (this.mode) {
      case 'all':
        this.loadAllPosts();
        break;
      case 'mine':
        this.loadMyPosts();
        break;
      case 'category':
        this.posts = [];
        this.loadCategories();
        break;
    }
  }

private loadAllPosts(): void {
  this.postService.findAll().subscribe({
    next: response => this.posts = response,
    error: console.error
  });
}

private loadMyPosts(): void {
  this.userService.findAuthenticatedUserPosts().subscribe({
    next: response => this.posts = response,
    error: console.error
  });
}

private loadCategories(): void {
  this.categoryService.findAll().subscribe({
    next: response => this.categories = response,
    error: console.error
  });
}

  searchByCategory(): void {
    if (!this.selectedCategory) {
      this.posts = [];
      return;
    }
    this.postService.findAll({
      title: '',
      category: this.selectedCategory

    }).subscribe({
      next: response => this.posts = response,
      error: console.error
    });
  }

  deletePost(id: number): void {
    if (!confirm('Delete this post?')) {
      return;
    }
    this.postService.delete(id).subscribe({
      next: () => this.load(),
      error: console.error
    });
  }

  createPost(): void {
    // TODO
    // abrir modal
  }

}
