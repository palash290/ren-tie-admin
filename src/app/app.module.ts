import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './core/login/login.component'
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component'
import { MainComponent } from './user/main/main.component'
import { AllUsersComponent } from './user/all-users/all-users.component'
import { NotificationsComponent } from './user/notifications/notifications.component'
import { BidComponent } from './user/bid/bid.component'
import { SideMenuComponent } from './user/side-menu/side-menu.component'
import { HeaderComponent } from './user/header/header.component'
import { NgxLoadingModule } from 'ngx-loading'
import { ToastrModule } from 'ngx-toastr'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptor } from './shared/services/auth.interceptor'
import { ResetPasswordComponent } from './core/reset-password/reset-password.component'
import { CustomDatePipe } from './shared/custom-date.pipe'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { NgxPaginationModule } from 'ngx-pagination'
import { NgxEditorModule } from 'ngx-editor'
import { ViewDetailComponent } from './view-detail/view-detail.component'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg'
import { FilterPipe, FilterPipe2, FilterPipe3 } from './shared/filter.pipe'
import { TermsConditionComponent } from './user/terms-condition/terms-condition.component'
import { TransactionHistoryComponent } from './user/transaction-history/transaction-history.component'
import { SupportComponent } from './core/support/support.component';
import { HomeComponent } from './core/home/home.component'
import { SubscriptionsComponent } from './user/subscriptions/subscriptions.component';
import { KFormatterPipe } from './shared/services/k-formatter.pipe'
import { InterestComponent } from './user/interest/interest.component'
import { IconPickerModule } from 'ngx-icon-picker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MainComponent,
    AllUsersComponent,
    NotificationsComponent,
    BidComponent,
    SideMenuComponent,
    HeaderComponent,
    ResetPasswordComponent,
    CustomDatePipe,
    ViewDetailComponent,
    //TransactionHistoryComponent,
    FilterPipe,
    FilterPipe2,
    FilterPipe3,
    SupportComponent,
    SubscriptionsComponent,
    HomeComponent,
    TransactionHistoryComponent,
    KFormatterPipe,
    InterestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IconPickerModule,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgxEditorModule,
    NgxIntlTelInputModule
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
