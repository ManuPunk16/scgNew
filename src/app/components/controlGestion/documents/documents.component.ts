import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../../models/document'
import { Global } from 'src/app/service/global';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public url: string;

  @Input() documents: Document[] = [];

  constructor() {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
