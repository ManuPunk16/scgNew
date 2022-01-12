import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterOutlet, RouterModule } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

import { HomeComponent } from "./components/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from "./components/controlGestion/login/login.component";
import { HomecComponent } from "./components/controlGestion/homec/homec.component";
import { SearchComponent } from "./components/controlGestion/search/search.component";
import { DocumentEditComponent } from "./components/controlGestion/document-edit/document-edit.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'ControlGestion', component: LoginComponent },
    { path: 'ControlGestion/inicio', component: HomecComponent },
    { path: 'ControlGestion/buscar/:search', component: SearchComponent },
    { path: 'ControlGestion/Editar/:id', component: DocumentEditComponent },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);