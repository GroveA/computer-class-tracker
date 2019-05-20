import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatChipsModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatExpansionModule,
  MatBadgeModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';


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

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    ComputerCardComponent,
    ComputerListComponent,
    GroupPanelComponent,
    CreateGroupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
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
    CountUpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateGroupComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
 }
