import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Document } from 'src/app/models/document';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // template: `
  //   <p> 
  //     {{item}}
  //   </p>
  // `,
  providers: [DocumentService]
})
export class SearchComponent implements OnInit {

  public documents: Document[] = [];
  public title: String = "Contenido relacionado con tu busqueda: ";

  @Input() item = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _documentService: DocumentService
  ) {
    // this.value = "";
  }

  ngOnInit(): void {
    this.search();
  }

  search(){
    this._route.params.subscribe(params => {
      var search = params['search'];
      console.log(search);
      this._documentService.search(search).subscribe(
        response => {
          // console.log(response);
          this.documents = response.documents;
        },
        error => {
          console.log(error);
          // this._router.navigate(['inicio']);
        }
      )
    });
  }

}
