import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { HomeTab } from '../../shared/enums/home-tab.enum';

@Component({
  selector: 'app-home',
  imports: [PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  HomeTab = HomeTab;
  selectedTab = HomeTab.ALL;

  changeTab(tab: HomeTab): void {
    this.selectedTab = tab;
  }

}
