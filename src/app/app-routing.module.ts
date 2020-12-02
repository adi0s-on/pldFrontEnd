import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { Shell } from './components/shell/shell.service';

const routes: Routes = [
  Shell.childRoutesNoAuth([
    { path: 'not-found', component: NotfoundComponent }
  ]),
  { path: '**', redirectTo:'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
