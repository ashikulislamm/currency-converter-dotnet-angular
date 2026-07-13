import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './public.component.html'
})
export class PublicComponent {
  readonly authService = inject(AuthService);
}
