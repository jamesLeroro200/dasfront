import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'q';
import { Article } from 'src/app/shared/components/models/norms/article';

@Component({
  selector: 'app-survey-js',
  templateUrl: './survey-js.component.html',
  styleUrls: ['./survey-js.component.scss']
})
export class SurveyJsComponent implements OnInit {
  json ;
  jsonReviewer ;
  article: Article = {id:"",title:"",questions:"{}",article:null,idChapter:""}; 
  articleReviewer1: Article = {id:"",title:"",questions:"{}",article:null,idChapter:""};
  articleReviewer2: Article = {id:"",title:"",questions:"{}",article:null,idChapter:""};
  constructor(private route : ActivatedRoute,private service : NormService) { }

  async ngOnInit() {
    await this.service.findArticle(this.route.snapshot.paramMap.get('id')).toPromise().then((data : string)=> this.article =JSON.parse(data));
    console.log(this.article.questions);
    this.json = JSON.parse(String(this.article.questions));
  }
  async onSurveySaved(survey) {
    
    this.json = survey;
    this.article.questions = JSON.stringify(this.json);
    console.log(this.json.title);
    this.article.title = this.json.title;
    console.log(this.article);
    await this.service.updateArticle(this.article).toPromise().then((data)=> console.log("okay"));

    //create survey for reviewer  
    await this.service.findArticleReviewer1(this.article).toPromise().then((data : string)=> this.articleReviewer1 =JSON.parse(data));
    console.log(this.articleReviewer1);
    await this.service.updateArticleReviewer1(this.articleReviewer1).toPromise().then((data)=> console.log("okay"));

    //create survey for reviewer  
    await this.service.findArticleReviewer2(this.articleReviewer1).toPromise().then((data : string)=> this.articleReviewer2 =JSON.parse(data));
    console.log(this.articleReviewer2);
    await this.service.updateArticleReviewer2(this.articleReviewer2).toPromise().then((data)=> console.log("okay"));

    alert("survey saved !");

}
sendData(result) {
  //TODO update with your own behavior
  console.log(result);
}
}
