import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TimePipe } from './time.pipe';

// Register dayjs plugins
dayjs.extend(duration);
dayjs.extend(utc);

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
