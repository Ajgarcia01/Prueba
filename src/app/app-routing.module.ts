import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvreadComponent } from './csvread/csvread.component';

const routes: Routes = [
  { path: 'csv', component: CsvreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
