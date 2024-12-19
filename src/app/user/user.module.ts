import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { MyProfileComponent } from './my-profile/my-profile.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component'
import { CustomDatePipe } from '../shared/custom-date.pipe'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { PComponent } from './p/p.component'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { TermsConditionComponent } from './terms-condition/terms-condition.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { NgxEditorModule } from 'ngx-editor'
import { BrowserModule } from '@angular/platform-browser'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { FilterPipe, FilterPipe2 } from '../shared/filter.pipe';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { InterestComponent } from './interest/interest.component'
//import 'ckeditor5/ckeditor5.css';

@NgModule({
  declarations: [
    MyProfileComponent,
    ChangePasswordComponent,
    PComponent,
    TermsConditionComponent,
    //CustomDatePipe
    // FilterPipe,
    // FilterPipe2,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CKEditorModule,
    
    NgxPaginationModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL'
      }
    })
  ]
})
export class UserModule {}
