import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), PipesModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
