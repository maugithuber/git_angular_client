import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import  { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';// configuraciones de routing


import { MaterializeModule } from 'angular2-materialize';
//pipes
import { MomentModule } from 'angular2-moment';
import { SearchPipe } from './pipes/search.pipe';
//modulo custom
import { MessagesModule } from './messages/messages.module';

//Componentes:
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';//
import { LoginComponent } from './components/login/login.component';//
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {UsersComponent} from './components/users/users.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {PublicationsComponent} from './components/publications/publications.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FollowingComponent} from './components/following/following.component';
import {FollowedComponent} from './components/followed/followed.component';

//servicios
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';  


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,//
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    //pipes
    SearchPipe
    
  ],
  imports: [
    BrowserModule,
    routing, //instancia del modulo 
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessagesModule,
    MaterializeModule
  ],
  providers: [ //servicios
    appRoutingProviders,
    UserService,
    UserGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
