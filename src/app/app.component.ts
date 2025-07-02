import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from "./core/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuscripManager';
}
