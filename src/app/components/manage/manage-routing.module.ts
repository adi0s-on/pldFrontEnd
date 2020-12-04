import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import {Shell} from '../shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
  { path: 'manage', component: ManageComponent }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
