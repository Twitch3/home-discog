import { Routes } from '@angular/router';
import { Home } from './components/views/home/home/home';
import { Library } from './components/views/home/library/library';
import { Settings } from './components/views/home/settings/settings';
import { DiscsView } from './components/views/home/library/components/discs-view/discs-view';
import { DiscDetailsView } from './components/views/home/library/components/disc-details-view/disc-details-view';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'library', component: Library},
  {path: 'settings', component: Settings},
  {path: 'discs', component: DiscsView},
  {path: 'disc-details', component: DiscDetailsView},
];
