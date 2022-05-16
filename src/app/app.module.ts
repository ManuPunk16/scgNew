import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
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
import { ProfileComponent } from './components/controlGestion/profile/profile.component';
import { BoardAdminComponent } from './components/controlGestion/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/controlGestion/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/controlGestion/board-user/board-user.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { DeparturesComponent } from './components/controlGestion/departures/departures.component';
import { HomeDepartureComponent } from './components/controlGestion/home-departure/home-departure.component';
import { AuthGuard } from './components/controlGestion/authguard.guard';
import { DeparturesEditComponent } from './components/controlGestion/departures-edit/departures-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from "@progress/kendo-angular-label";
import { IconsModule } from "@progress/kendo-angular-icons";
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";

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
    StatisticsComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    DeparturesComponent,
    HomeDepartureComponent,
    DeparturesComponent,
    DeparturesEditComponent
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
    NgChartsModule,
    NgbModule,
    Ng2SmartTableModule,
    GridModule,
    BrowserAnimationsModule,
    ChartsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    LabelModule,
    IconsModule,
    HttpClientJsonpModule,
    DialogsModule,
    NotificationModule,
    DateInputsModule,
    IntlModule
  ],
  providers: [appRoutingProviders, authInterceptorProviders, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
