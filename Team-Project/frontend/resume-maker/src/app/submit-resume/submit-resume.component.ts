import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-submit-resume',
  templateUrl: './submit-resume.component.html',
  styleUrls: ['./submit-resume.component.css']
})
export class SubmitResumeComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file : any = null;
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    this.file = event.target.files[0];
  }
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
                this.shortLink = event.link;
                this.loading = false; // Flag variable 
            }
        }
    );
  }

}
