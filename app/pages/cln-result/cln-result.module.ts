import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClnResultPageRoutingModule } from './cln-result-routing.module';

import { ClnResultPage } from './cln-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClnResultPageRoutingModule
  ],
  declarations: [ClnResultPage]
})
export class ClnResultPageModule {}
