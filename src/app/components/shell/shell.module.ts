import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';
import {HeaderModule} from './header/header.module';

@NgModule({
  imports: [CommonModule, RouterModule, HeaderModule],
  declarations: [ShellComponent]
})
export class ShellModule {}
