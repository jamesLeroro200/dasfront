import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationReviewer } from '../../models/application-reviewer';
import { ApplicationReviewerService } from '../../services/application-reviewer.service';

@Component({
  selector: 'app-application-reviewer-survey-js',
  templateUrl: './application-reviewer-survey-js.component.html',
  styleUrls: ['./application-reviewer-survey-js.component.scss']
})
export class ApplicationReviewerSurveyJsComponent implements OnInit {
  json ;
  applicationReviewer: ApplicationReviewer = {id:"",name:"",version:"",description:"",status:false,questions:"{}"}; 
  applicationReviewer1: ApplicationReviewer = {id:"",name:"",version:"",description:"",status:false,questions:"{}"}; 
  applicationReviewer2: ApplicationReviewer = {id:"",name:"",version:"",description:"",status:false,questions:"{}"}; 
  constructor(private route : ActivatedRoute,private service : ApplicationReviewerService) { }

  async ngOnInit() {
    await this.service.findApplicationReviewer(this.route.snapshot.paramMap.get('id')).toPromise().then((data : string)=> this.applicationReviewer =JSON.parse(data));
    console.log(this.applicationReviewer.questions);
    this.json = JSON.parse(String(this.applicationReviewer.questions));
  }

  async onSurveySaved(survey) {
    
    this.json = survey;
    this.applicationReviewer.questions = JSON.stringify(this.json);
    console.log(this.json.title);
    this.applicationReviewer.name = this.json.title;
    console.log(this.applicationReviewer);
    await this.service.update(this.applicationReviewer).toPromise().then((data)=> console.log("okay"));

    //create survey for reviewer  
    await this.service.findApplicationReviewer1(this.applicationReviewer).toPromise().then((data : string)=> this.applicationReviewer1 =JSON.parse(data));
    console.log(this.applicationReviewer1);
    await this.service.applicationUpdateReviewer1(this.applicationReviewer1).toPromise().then((data)=> console.log("okay"));

    //create survey for reviewer  
    await this.service.findApplicationReviewer2(this.applicationReviewer1).toPromise().then((data : string)=> this.applicationReviewer2 =JSON.parse(data));
    console.log(this.applicationReviewer2);
    await this.service.applicationUpdateReviewer2(this.applicationReviewer2).toPromise().then((data)=> console.log("okay"));
    
    alert("survey saved !");
}

}
