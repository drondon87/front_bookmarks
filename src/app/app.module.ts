import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ngx-translate and the loader module
    HttpClientModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
