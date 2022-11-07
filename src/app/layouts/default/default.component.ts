import { AdminUser } from './../../shared/components/models/admin-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarService } from 'src/app/shared/services/side-bar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { MatIconRegistry } from '@angular/material';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {
  adminUser: AdminUser;
  sideBarOpen = true ;
  title = 'angular-idle-timeout';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

public modalRef: BsModalRef;

@ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(public sideBarService: SideBarService,private authService: AuthService, private idle: Idle, private keepalive: Keepalive,private router: Router, private http:HttpClient, private _sanitizer:DomSanitizer, private iconRegistry:MatIconRegistry) {
        // sets an idle timeout of 15 minutes, for testing purposes.
    idle.setIdle(15*60);
    // sets a timeout period of 5 seconds. after 15 minutes of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    let doc=document.getElementById("cont");
    this.iconRegistry=new MatIconRegistry(http, _sanitizer, doc);
    this.iconRegistry.addSvgIcon("arrow", "http://www.w3.org/2000/svg/");



    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.invalidateSession();
    });

    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
        this.childModal.show();
        console.log("After childModal show()");
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    console.log("is loggedin: " + this.authService.isLoggedIn);
    this.authService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        console.log("userLoggedIn: "+userLoggedIn);
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })
    }
    reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }
    invalidateSession(){
      localStorage.setItem('token', null);
    }
    onClickOK(){
      this.childModal.hide();
      localStorage.setItem('token', null);
      this.sideBarService.showLogin = true;
      this.sideBarService.showLogout = false;
      this.sideBarService.showSideBar = false;
      this.router.navigate(['']);
    }

  async ngOnInit() {
    await this.sideBarService.getAdminUser().toPromise().then(async res=>{
      this.adminUser = <AdminUser>res;
      if(this.adminUser!=null){
        this.sideBarService.showSideBar = true;
        this.authService.setUserLoggedIn(true);
      }
      else{
        this.sideBarService.showSideBar = false;
        this.authService.setUserLoggedIn(false);
      }
    });

  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
