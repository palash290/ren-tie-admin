import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/services/shared.service';
import { stripHtmlTags } from '../../shared/validators';
import { Editor, Toolbar } from 'ngx-editor';
//import 'ckeditor5/ckeditor5.css';


@Component({
  selector: 'app-p',
  templateUrl: './p.component.html',
  styleUrl: './p.component.css'
})
export class PComponent {

  id: any;

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

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

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public editorData = '';
  editor!: Editor;
  


  getNotifications() {
    this.service.getApi('adminRouter/getTermsAndConditions').subscribe({
      next: resp => {
       // this.editorData = stripHtmlTags(resp.detail[0].privacy_policy);
       this.editorData = resp.detail[0].privacy_policy;
        this.id = resp.detail[0].id;
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  onUpdate() {
    if (/^(<p><\/p>)+$/.test(this.editorData.replace(/\s+/g, ''))) {
      this.toastr.error('Privacy and policy should not be empty.');
      return;
    }
    
    const formURlData = new URLSearchParams();
    const htmlContent = `${this.editorData}`; // Ensure content is HTML

    formURlData.set('privacy_policy', htmlContent);
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
        console.log(error.message)
      }
    })
  }


}
