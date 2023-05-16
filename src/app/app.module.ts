import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { AuthModule} from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { PipesModule } from './pipes/pipes.module';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { getAuth, provideAuth } from '@angular/fire/auth';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,PipesModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HttpService, GooglePlus],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
