import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageuserComponent } from './components/mainpageuser/mainpageuser.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [

  {
    path: 'mainpage',
    component: MainpageuserComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'login',
    component: LoginComponent
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
