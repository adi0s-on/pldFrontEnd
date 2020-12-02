import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainpageuserComponent} from './mainpageuser.component';
import {Shell} from '../shell/shell.service';

const routes: Routes = [
  Shell.childRoutesNoAuth([
    { path: '', component: MainpageuserComponent },
    { path: 'home', component: MainpageuserComponent}
  ]
)];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class MainpageuserRoutingModule {

}
