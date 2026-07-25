import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryRequest } from '../../dto/category/category-request';
import { CategoryResponse } from '../../dto/category/category-response';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category.component',
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {

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
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.loadAllCategories();
      },
      error: (error) => {
        console.error(error);
      }
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
