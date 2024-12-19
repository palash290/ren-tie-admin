import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { stripHtmlTags } from '../../shared/validators';
import { Editor, Toolbar } from 'ngx-editor';
//import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.css'
})
export class TermsConditionComponent {

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

  editor!: Editor;

  ngOnInit() {
    this.editor = new Editor();
    this.getNotifications();
  }

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  public editorData = '';
  id: any;




  getNotifications() {
    this.service.getApi('adminRouter/getTermsAndConditions').subscribe({
      next: resp => {
        this.editorData = resp.detail[0].terms_and_conditions;
        //this.editorData = stripHtmlTags(resp.detail[0].terms_and_conditions);
        this.id = resp.detail[0].id;
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  onUpdate() {
    // if (this.editorData == "<p></p><p></p><p></p><p></p><p></p>") {
    //   this.toastr.error('Terms and conditions should not be empty.')
    //   return
    // }
    if (/^(<p><\/p>)+$/.test(this.editorData.replace(/\s+/g, ''))) {
      this.toastr.error('Terms and conditions should not be empty.');
      return;
    }
    const formURlData = new URLSearchParams();
    const htmlContent = `${this.editorData}`; // Ensure content is HTML

    formURlData.set('terms_and_conditions', htmlContent);
    formURlData.set('id', this.id);

    this.service.postAPI('adminRouter/updateTermsAndConditions', formURlData.toString()).subscribe({
      next: (resp) => {
        if (resp.success === true) {
          this.toastr.success('Update successful!');
          this.getNotifications();
        } else {
          this.toastr.warning(resp.message);
        }
      },
      error: error => {
        this.toastr.warning('Something went wrong.');
        console.log(error.message);
      }
    });
  }



}
