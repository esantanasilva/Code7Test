import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitsListComponent } from './pages/debits-list/debits-list.component';
import { RegisterDebtComponent } from './pages/register-debt/register-debt.component';
import { AuthGuardService } from './guards/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'debits', component: DebitsListComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterDebtComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
