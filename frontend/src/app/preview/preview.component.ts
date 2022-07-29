import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  template: string | undefined;
  Clean : boolean | undefined;
  Classic : boolean | undefined;
  Crisp : boolean | undefined;
  Cubic : boolean | undefined;
  Serif : boolean | undefined;
  Simple : boolean | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.template = params.template;
      console.log(this.template)
    })
    if (this.template === "clean"){
      this.Clean = !this.Clean;
    }
    else if (this.template === "classic"){
      this.Classic = !this.Classic;
      //console.log(this.Classic);
    }
    else if (this.template === "crisp"){
      this.Crisp = !this.Crisp;
      //console.log(this.Crisp);
    }
    else if (this.template === "cubic"){
      this.Cubic = !this.Cubic
    }
    else if (this.template === "serif"){
      this.Serif = !this.Serif;
    }
    else if (this.template === "simple"){
      this.Simple = !this.Simple;
    }
  }

  /*based on query params it would render whatever resume template
  use the template */

}
