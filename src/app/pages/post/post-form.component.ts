import { Component, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { CategoryResponse } from '../../dto/category/category-response';
import { PostCreateRequest } from '../../dto/post/post-create-request';
import { PostUpdateRequest } from '../../dto/post/post-update-request';
import { PostViewResponse } from '../../dto/post/post-view-response';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnChanges {

  private readonly postService = inject(PostService);
  private readonly categoryService = inject(CategoryService);

  @Input()
  post: PostViewResponse | null = null;

  @Output()
  saved = new EventEmitter<void>();

  @Output()
  cancelled = new EventEmitter<void>();

  categories = signal<CategoryResponse[]>([]);
  
  saving = signal(false);

  title = signal('');
  content = signal('');
  categoryId = signal(0);

  get editing(): boolean {
    return this.post !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      if (this.post) {
        this.title.set(this.post.title);
        this.content.set(this.post.content);
        this.categoryId.set(this.post.category.id);
      } else {
        this.clearForm();
      }
    }
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: response => {
        this.categories.set(response);
        if (this.post) {
          this.categoryId.set(this.post.category.id);
        }
      },
      error: console.error
    });
  }

  save(): void {
    if (!this.title().trim()) {
      alert('Title is required.');
      return;
    }
    if (!this.content().trim()) {
      alert('Content is required.');
      return;
    }
    if (!this.categoryId()) {
      alert('Select a category.');
      return;
    }
    this.saving.set(true);
    if (this.editing) {
      const request: PostUpdateRequest = {
        title: this.title().trim(),
        content: this.content().trim(),
        categoryId: this.categoryId()
      };
      this.postService.update(this.post!.id, request).subscribe({
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
      const request: PostCreateRequest = {
        title: this.title().trim(),
        content: this.content().trim(),
        categoryId: this.categoryId()
      };
      this.postService.create(request).subscribe({
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
    this.title.set('');
    this.content.set('');
    this.categoryId.set(0);
  }

}
