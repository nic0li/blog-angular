import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
