import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Shell} from '../shell/shell.service';
import {UserProfileComponent} from './user-profile.component';

const routes: Routes = [
  Shell.childRoutes([
  { path: 'profile', component: UserProfileComponent }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
