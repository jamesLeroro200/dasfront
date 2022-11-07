import { SideBarService } from "./../../services/side-bar.service";
import { Component, OnInit } from "@angular/core";
import { AdminUser } from "../models/admin-user";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { UploadImageComponent } from "../upload-image/upload-image.component";
import { DomSanitizer } from "@angular/platform-browser";
import { PhotoModel } from "../models/photo-model";
import { Photo } from "../models/photo";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public adminUser: AdminUser;
  public isPhotoAvailable = false;
  public showPhoto = true;
  public image: any;
  public objectURL: any;
  message = "";
  public photoModel: Photo;
  constructor(
    public sideBarService: SideBarService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}
  selectedFile: any;
  photoId: any;

  async ngOnInit() {
    if (localStorage.getItem("token") != null) {
      await this.sideBarService
        .getAdminUser()
        .toPromise()
        .then(async (res) => {
          this.adminUser = <AdminUser>res;
          console.log("this.adminUser" + this.adminUser);
          if (this.adminUser != null) {
            this.sideBarService.adminUserFullName =
              this.adminUser.firstName + " " + this.adminUser.lastName;
            this.sideBarService.email = this.adminUser.email;
            console.log(
              "LastName and email: " +
                this.sideBarService.adminUserFullName +
                " " +
                this.sideBarService.email
            );
            this.photoId = this.adminUser.photoId;
            console.log("this.adminUser.photo.id: " + this.adminUser.photoId);
          }
        });
      await this.sideBarService
        .getRole()
        .toPromise()
        .then(async (res) => {
          if (res != null) {
            this.sideBarService.role = res.role;
          }
        });
      if (this.adminUser != null && this.adminUser.photoId != null) {
        this.sideBarService.getPhoto(this.photoId).subscribe(async (res) => {
          this.photoModel = <Photo>res;
          console.log("getPhoto in Component executed: " + this.photoId);
          if (this.photoModel != null) {
            this.objectURL = "data:image/jpeg;base64," + this.photoModel.image;
            this.sideBarService.objectURL = this.objectURL;
          }
        });
      }
    }
  }

  OnUpdatePhoto() {
    const configuration = new MatDialogConfig();
    configuration.autoFocus = true;
    let dialog = this.dialog.open(UploadImageComponent, configuration);
    dialog.afterClosed().subscribe((data) => {
      this.message = data;
    });
  }

  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
