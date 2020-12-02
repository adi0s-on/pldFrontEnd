import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageuserComponent } from './components/mainpageuser/mainpageuser.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [

  {
    path: 'mainpage',
    component: MainpageuserComponent
  },

  {
    path: '',
    redirectTo: '/mainpage',
    pathMatch: 'full'
  },

  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
