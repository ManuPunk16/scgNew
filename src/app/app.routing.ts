import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterOutlet, RouterModule, Route } from "@angular/router";
import { AuthGuard } from "./components/controlGestion/authguard.guard";
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
import { HomeDepartureComponent } from "./components/controlGestion/home-departure/home-departure.component";
import { DeparturesEditComponent } from "./components/controlGestion/departures-edit/departures-edit.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Inicio', component: HomeComponent },
  { path: 'Estadisticas', component: StatisticsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'Usuario', component: BoardUserComponent, canActivate: [AuthGuard] },
  { path: 'Moderador', component: BoardModeratorComponent, canActivate: [AuthGuard] },
  { path: 'Administrador', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: 'Salidas', component: HomeDepartureComponent, canActivate: [AuthGuard] },
  { path: 'Salidas/Editar/:id', component: DeparturesEditComponent, canActivate: [AuthGuard] },
  { path: 'Entradas', component: HomecComponent, canActivate: [AuthGuard] },
  { path: 'Entradas/Buscar/:search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'Entradas/Editar/:id', component: DocumentEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
