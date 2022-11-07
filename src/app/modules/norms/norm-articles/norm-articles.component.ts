import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'q';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog/delete-confirmation/delete-confirmation.component';
import { Article } from 'src/app/shared/components/models/norms/article';
import { NgxSpinnerService } from "ngx-spinner";
import { Chapter } from 'src/app/shared/components/models/norms/chapter';

@Component({
  selector: 'app-norm-articles',
  templateUrl: './norm-articles.component.html',
  styleUrls: ['./norm-articles.component.scss']
})
export class NormArticlesComponent implements OnInit {
  chapter;
  idChapter: String;
  articlesNumber = 0;
  searchKey: String;
  LisData: MatTableDataSource<any>;
  articleReviwer: Article;
  articleSuperUser: Article;
  articles = [];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumn: string[] = ['title', 'actions'];
  constructor(private route: ActivatedRoute, private service: NormService, public router: Router, public deletDialog: MatDialog, private SpinnerService: NgxSpinnerService) { }

  async ngOnInit() {
    await this.service.FindChapter(this.route.snapshot.paramMap.get('id')).toPromise().then((data: string) => {
      this.chapter = JSON.parse(data);
    });
    this.idChapter = this.chapter.id;
    this.articlesNumber = this.chapter.articles.length;
    this.articles = this.chapter.articles;
    this.LisData = new MatTableDataSource(this.articles);
  }
  async onCreat(): Promise<void> {
    console.log(this.idChapter);
    //add article for super user
    const articleSuperUser: Article = { id: "", title: "newArticle", questions: "{}", article: null,idChapter : this.idChapter};
    await this.service.ArticleCreat(articleSuperUser).toPromise().then((data: string) => articleSuperUser.id = JSON.parse(data).id);
    this.LisData.data.push(articleSuperUser);
    this.LisData._updateChangeSubscription();
    await this.service.ChapterEdit(this.chapter).toPromise().then((data) => console.log(data));

    //add article for reviewer level 1
    const articleReviewer1: Article = { id: "", title: "newArticleReviewer1", questions: "{}", article: articleSuperUser ,idChapter : this.idChapter};
    await this.service.ArticleCreatReviewer1(articleReviewer1).toPromise().then((data: string) => articleReviewer1.id = JSON.parse(data).id);
    this.LisData.data.push(articleReviewer1);
    this.LisData._updateChangeSubscription();
    await this.service.ChapterEdit(this.chapter).toPromise().then((data) => console.log(data));

    //add article for reviewer level2
    const articleReviewer2: Article = { id: "", title: "newArticleReviewer2", questions: "{}", article: articleReviewer1 ,idChapter : this.idChapter};
    await this.service.ArticleCreatReviewer2(articleReviewer2).toPromise().then((data: string) => articleReviewer2.id = JSON.parse(data).id);
    this.LisData.data.push(articleReviewer2);
    this.LisData._updateChangeSubscription();
    await this.service.ChapterEdit(this.chapter).toPromise().then((data) => console.log(data));

  }
  async onSubmit() {
    this.chapter.articles = this.articles;
    let resp = this.service.ChapterEdit(this.chapter);
    console.log(typeof (this.chapter));
    resp.subscribe((data) => console.log(data));
    this.LisData = new MatTableDataSource(this.chapter.articles);
  }
  async onUpdate(row) {
    this.SpinnerService.show();
    await delay(500);
    this.router.navigate(['/Norms/SurveyJs', row.id]);
    this.SpinnerService.hide();
  }
  onDelet(row) {
    let index = this.LisData.data.indexOf(row);
    let resp = this.service.DeleteArticle(row.id);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      { data: { message: "Are you sure you want to delete " + row.title + "?" } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.DeleteArticle(row.id).subscribe((data) => {
          console.log("success");
        });
        if (index == this.LisData.data.length - 1) {
          this.LisData.data.splice(-1, 1);
          this.LisData._updateChangeSubscription();
        } else {
          this.LisData.data.splice(index, 1);
          this.LisData._updateChangeSubscription();
        }
      }
    });
  }

}
