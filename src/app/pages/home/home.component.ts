import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post/post-list.component';
import { HomeTab } from '../../shared/enums/home-tab.enum';

@Component({
  selector: 'app-home',
  imports: [PostListComponent],
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
