import { SideBarService } from "src/app/shared/services/side-bar.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { AdminUser } from "../models/admin-user";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  message;
  logout = false;
  adminUser: AdminUser;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(
    public sideBarService: SideBarService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.sideBarService
      .getAdminUser()
      .toPromise()
      .then(async (res) => {
        this.adminUser = <AdminUser>res;
        if (this.adminUser != null) {
          this.sideBarService.showLogout = true;
          this.sideBarService.showLogin = false;
        } else {
          this.sideBarService.showLogout = false;
          this.sideBarService.showLogin = true;
        }
      });
  }

  onToggle(){
    this.sideBarService.showSideBar= !this.sideBarService.showSideBar;
    this.toggleSideBar();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
  redirectToLogin() {
    this.router.navigate(["login"]);
  }

  openReegistry() {
    this.router.navigate(["register"]);
  }
  logOut() {
    this.sideBarService.objectURL = null;
    this.sideBarService.adminUserFullName = null;
    this.sideBarService.email = null;
    this.authService.getLogOut().subscribe((res) => {
      this.logout = <boolean>res;
      this.sideBarService.showLogout = false;
      this.sideBarService.showLogin = true;
      this.sideBarService.showSideBar = false;
      localStorage.removeItem("token");
    });
  }
}
