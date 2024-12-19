import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AllUsersComponent } from './all-users/all-users.component'
import { BidComponent } from './bid/bid.component'
import { MainComponent } from './main/main.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { MyProfileComponent } from './my-profile/my-profile.component'
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component'
import { PComponent } from './p/p.component'
import { TermsConditionComponent } from './terms-condition/terms-condition.component'
import { ViewDetailComponent } from '../view-detail/view-detail.component'
import { SubscriptionsComponent } from './subscriptions/subscriptions.component'
import { InterestComponent } from './interest/interest.component'

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'all-users',
        component: AllUsersComponent
      },
      {
        path: 'notification',
        component: NotificationsComponent
      },
      {
        path: 'bid',
        component: BidComponent
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      {
        path: 'pandp',
        component: PComponent
      },
      {
        path: 'terms-condition',
        component: TermsConditionComponent
      },
      {
        path: 'view/:userId',
        component: ViewDetailComponent
      },
      {
        path: 'subscription',
        component: SubscriptionsComponent
      },
      {
        path: 'interest',
        component: InterestComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
