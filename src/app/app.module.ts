import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToastrModule } from 'ngx-toastr'

import { ComputerCardComponent } from './computer-card/computer-card.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { ComputerListComponent } from './computer-list/computer-list.component';

import { CountUpModule } from 'countup.js-angular2';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { CreateGroupComponent } from './dialogs/create-group/create-group.component';
import { RouterModule, Routes } from '@angular/router';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectGroupComponent } from './dialogs/select-group/select-group.component';
import { ComputerNameComponent } from './dialogs/computer-name/computer-name.component';
import { TimeBackPipe } from './computer-detail/custom.time.pipe';

const appRoutes: Routes = [
  // { path: 'groups/all', component: ComputerListComponent },
  { path: 'groups/:id', component: ComputerListComponent},
  { path: 'computer/:id',      component: ComputerDetailComponent },
  { path: '',
    redirectTo: '/groups/all',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    TimeBackPipe,
    AppComponent,
    AppNavigationComponent,
    ComputerCardComponent,
    ComputerListComponent,
    ComputerDetailComponent,
    GroupPanelComponent,
    CreateGroupComponent,
    PageNotFoundComponent,
    SelectGroupComponent,
    ComputerNameComponent,
    

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    ToastrModule.forRoot(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatChipsModule,
    FontAwesomeModule,
    HttpClientModule,
    CountUpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateGroupComponent, SelectGroupComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
 }
