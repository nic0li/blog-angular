import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryRequest } from '../../models/category-request';
import { CategoryResponse } from '../../models/category-response';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories.component',
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly categoryService = inject(CategoryService);

  categories = signal<CategoryResponse[]>([]);

  request: CategoryRequest = {
    name: ''
  };
  editingId: number | null = null;

  ngOnInit(): void {
    this.loadAllCategories();
  }

  save(): void {
    if (this.editingId) {
      this.update();
    } else {
      this.create();
    }
  }

  edit(category: CategoryResponse): void {
    this.editingId = category.id;
    this.request = {
      name: category.name
    };
  }

  delete(id: number): void {
    if (!confirm('Delete this category?')) {
      return;
    }
    this.categoryService.delete(id).subscribe({
      next: () => this.loadAllCategories(),
      error: console.error
    });
  }

  cancel(): void {
    this.clearForm();
  }

  private loadAllCategories(): void {
    this.categoryService.findAll().subscribe({
      next: response => this.categories.set(response),
      error: console.error
    });
  }

  private create(): void {
    this.categoryService.create(this.request).subscribe({
      next: () => {
        this.loadAllCategories();
        this.clearForm();
      },
      error: console.error
    });
  }

  private update(): void {
    if (!this.editingId) {
      return;
    }
    this.categoryService.update(this.editingId, this.request).subscribe({
      next: () => {
        this.loadAllCategories();
        this.clearForm();
      },
      error: console.error
    });
  }

  private clearForm(): void {
    this.editingId = null;
    this.request = {
      name: ''
    };
  }

}
