import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitsListComponent } from './pages/debits-list/debits-list.component';
import { RegisterDebtComponent } from './pages/register-debt/register-debt.component';


const routes: Routes = [
  { path: '', redirectTo: 'debits', pathMatch: 'full' },
  { path: 'debits', component: DebitsListComponent },
  { path: 'register', component: RegisterDebtComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
