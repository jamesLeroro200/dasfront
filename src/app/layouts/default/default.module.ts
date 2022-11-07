import { SideBarService } from 'src/app/shared/services/side-bar.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule, MatDividerModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { NormsComponent } from 'src/app/modules/norms/norms.component';
import {TreeGridModule} from '@syncfusion/ej2-angular-treegrid';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { EditModalComponent } from 'src/app/modules/modal/edit-modal/edit-modal.component';
import { UpdateNormComponent } from 'src/app/modules/norms/update-norm/update-norm.component';
import { NumericValidator } from 'src/app/modules/modal/validator/validatorNumeric';
import { NumbersValidator } from 'src/app/modules/modal/validator/NumbersValidators';
import { NormChapterComponent } from 'src/app/modules/norms/norm-chapter/norm-chapter.component';
import { NormArticlesComponent } from 'src/app/modules/norms/norm-articles/norm-articles.component';
import { SurveyCreatorComponent } from 'src/app/modules/norms/survey/survey-creator/survey-creator.component';
import { SurveyJsComponent } from 'src/app/modules/norms/survey/survey-js/survey-js.component';
import { CompaniesComponent } from 'src/app/modules/companies/companies.component';
import { NguiInviewModule, NguiListModule, NguiUtilsModule }  from '@ngui/common';
import { NgIdleModule } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [DefaultComponent,
  DashboardComponent,
  PostsComponent,
  NormsComponent,
  EditModalComponent,
  UpdateNormComponent,
  NumericValidator,
  NumbersValidator,
  NormChapterComponent,
  NormArticlesComponent,
  SurveyCreatorComponent,
  SurveyJsComponent,
  CompaniesComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        TreeGridModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule,
        MatPaginatorModule,
        MatSortModule,
        NguiListModule,
        NguiInviewModule,
        NguiUtilsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        ModalModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        MomentModule,
        NgIdleModule,
        MatSelectModule,
        MatTabsModule
    ],
  exports: [
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
  ],
  entryComponents:[EditModalComponent,UpdateNormComponent],
  providers : [
    DashboardService,
    NormService,
    SideBarService,
  ]
})
export class DefaultModule { }
