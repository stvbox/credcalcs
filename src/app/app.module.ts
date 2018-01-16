import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ConditionWayComponent } from './condition-way/condition-way.component';
import { ConditionConvasComponent } from './condition-convas/condition-convas.component';
import { ConditionTreeService } from './condition-tree.service';
import { CalcEmulaterComponent } from './calc-emulater/calc-emulater.component';
import { ConditionTreesComponent } from './condition-trees/condition-trees.component';

@NgModule({
  declarations: [
    AppComponent,
    ConditionWayComponent,
    ConditionConvasComponent,
    CalcEmulaterComponent,
    ConditionTreesComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [ConditionTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
