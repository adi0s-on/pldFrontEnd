import {Route, Routes} from '@angular/router';
import {ShellComponent} from './shell.component';
import {AuthGuard} from '../../shared/services/auth/auth.guard';

export class Shell {

  constructor() { }

  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [ AuthGuard ],
      data: { reuse: true }
    }
  }

  static childRoutesNoAuth(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      data: { reuse: true }
    }
  }
}
