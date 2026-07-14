import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/layout/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    RouterLink, 
    NavbarComponent, 
    ButtonComponent, 
    CardComponent, 
    BadgeComponent, 
    LucideDynamicIcon
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {
  readonly authService = inject(AuthService);
}
