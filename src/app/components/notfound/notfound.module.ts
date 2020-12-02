import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { RouterModule } from '@angular/router';
import {NotfoundRoutingModule} from './notfound-routing.module';

@NgModule({
  declarations: [ NotfoundComponent ],
  imports: [CommonModule, NotfoundRoutingModule, RouterModule],
})
export class NotfoundModule {}
