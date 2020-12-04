import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule } from '@angular/router';
import { ManageRoutingModule } from './manage-routing.module';

@NgModule({
    declarations: [ ManageComponent ],
    imports: [CommonModule, ManageRoutingModule, RouterModule],
  })
  export class ManageModule {}
  