import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { appRoutingProviders, routing } from './app.routing';
import { LoginComponent } from './components/controlGestion/login/login.component';
import { HomecComponent } from './components/controlGestion/homec/homec.component';
import { SearchComponent } from './components/controlGestion/search/search.component';
import { DocumentsComponent } from './components/controlGestion/documents/documents.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    HomecComponent,
    SearchComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
