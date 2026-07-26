import { Component, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryResponse } from '../../dto/category/category-response';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PostCardComponent } from './post-card.component';
import { HomeTab } from '../../shared/enums/home-tab.enum';
import { PostFormComponent } from './post-form.component';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule, PostCardComponent, PostFormComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnChanges {

  private readonly postService = inject(PostService);
  private readonly userService = inject(UserService);
  private readonly categoryService = inject(CategoryService);

  @Input({ required: true })
  mode!: HomeTab;

  posts = signal<PostViewResponse[]>([]);
  categories = signal<CategoryResponse[]>([]);
  selectedCategory = signal<string>('');
  HomeTab = HomeTab;

  showForm = signal(false);
  editingPost = signal<PostViewResponse | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.load();
    }
  }

  searchByCategory(): void {
    if (!this.selectedCategory()) {
      this.posts.set([]);
      return;
    }
    this.postService.findAll({
      title: '',
      category: this.selectedCategory()
    }).subscribe({
      next: response => this.posts.set(response),
      error: console.error
    });
  }

  createPost(): void {
    this.editingPost.set(null);
    this.showForm.set(true);
  }

  editPost(post: PostViewResponse): void {
    this.editingPost.set(post);
    this.showForm.set(true);
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

  closeForm(): void {
    this.showForm.set(false);
  }

  postSaved(): void {
    this.closeForm();
    this.load();
  }
  
  private load(): void {
    switch (this.mode) {
      case HomeTab.ALL:
        this.loadAllPosts();
        break;
      case HomeTab.MINE:
        this.loadAuthenticatedUserPosts();
        break;
      case HomeTab.CATEGORY:
        this.loadAllByCategory();
        break;
    }
  }

  private loadAllPosts(): void {
    this.postService.findAll().subscribe({
      next: response => this.posts.set(response),
      error: console.error
    });
  }

  private loadAuthenticatedUserPosts(): void {
    this.userService.findAuthenticatedUserPosts().subscribe({
      next: response => this.posts.set(response),
      error: console.error
    });
  }

  private loadAllByCategory(): void {
    this.loadAllCategories();
    if (this.selectedCategory()) {
      this.searchByCategory();
    } else {
      this.posts.set([]);
    }
  }

  private loadAllCategories(): void {
    this.categoryService.findAll().subscribe({
      next: response => this.categories.set(response),
      error: console.error
    });
  }

}
