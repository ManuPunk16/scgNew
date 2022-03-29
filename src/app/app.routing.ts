import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterOutlet, RouterModule } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

import { HomeComponent } from "./components/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import { LoginComponent } from "./components/controlGestion/login/login.component";
import { HomecComponent } from "./components/controlGestion/homec/homec.component";
import { SearchComponent } from "./components/controlGestion/search/search.component";
import { DocumentEditComponent } from "./components/controlGestion/document-edit/document-edit.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { ProfileComponent } from "./components/controlGestion/profile/profile.component";
import { BoardModeratorComponent } from "./components/controlGestion/board-moderator/board-moderator.component";
import { BoardAdminComponent } from "./components/controlGestion/board-admin/board-admin.component";
import { BoardUserComponent } from "./components/controlGestion/board-user/board-user.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'Estadisticas', component: StatisticsComponent },
    { path: 'ControlGestion', component: LoginComponent },
    { path: 'Perfil', component: ProfileComponent},
    { path: 'Usuario', component: BoardUserComponent },
    { path: 'Moderador', component: BoardModeratorComponent },
    { path: 'Administrador', component: BoardAdminComponent },
    { path: 'ControlGestion/inicio', component: HomecComponent },
    { path: 'ControlGestion/buscar/:search', component: SearchComponent },
    { path: 'ControlGestion/Editar/:id', component: DocumentEditComponent },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);