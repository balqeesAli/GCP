import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClnResultPage } from './cln-result.page';

const routes: Routes = [
  {
    path: '',
    component: ClnResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClnResultPageRoutingModule {}
