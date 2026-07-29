import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
