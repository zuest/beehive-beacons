import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { IBeacon } from '@ionic-native/ibeacon';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp, {
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    EstimoteBeacons,
    IBeacon,
    HelperServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
