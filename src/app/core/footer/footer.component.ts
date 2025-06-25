import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  footerLinks$: Observable<{ text: string; url: string }[]> = of([
    { text: 'Términos y condiciones', url: '#' },
    { text: 'Política de privacidad', url: '#' }
  ]);
}