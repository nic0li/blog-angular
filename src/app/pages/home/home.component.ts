import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home.component',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categoryService.findAll().subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });

  }

}
