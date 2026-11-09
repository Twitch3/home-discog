import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon'
import { DiscType } from './shared/types/disc-type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatDrawerContainer, MatDrawer, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('home-discog');
  public showFiller = false;
  public types = DiscType;
}
