import { Component, inject, HostBinding } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class LoaderComponent {
  protected readonly loader = inject(LoaderService);

  @HostBinding('class.is-visible') get isVisible() {
    return this.loader.isVisible();
  }

  @HostBinding('class.is-loading') get isLoading() {
    return this.loader.status() === 'loading';
  }

  @HostBinding('class.is-success') get isSuccess() {
    return this.loader.status() === 'success';
  }

  @HostBinding('class.is-error') get isError() {
    return this.loader.status() === 'error';
  }
}
