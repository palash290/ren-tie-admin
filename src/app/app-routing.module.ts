import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/login/login.component'
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component'
import { authGuard } from './shared/auth/auth.guard'
import { ResetPasswordComponent } from './core/reset-password/reset-password.component'
import { SupportComponent } from './core/support/support.component'
import { HomeComponent } from './core/home/home.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  // {
  //   path: "confirmPassword/:id",
  //   component: ResetPasswordComponent,
  // },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
