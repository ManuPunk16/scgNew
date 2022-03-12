import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { NgChartsModule } from 'ng2-charts';

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
import { DocumentEditComponent } from './components/controlGestion/document-edit/document-edit.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

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
    DocumentsComponent,
    DocumentEditComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgxPaginationModule,
    OrderModule,
    NgChartsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
