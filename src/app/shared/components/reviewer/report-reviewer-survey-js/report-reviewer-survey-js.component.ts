import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportReviewer } from '../../models/report-reviewer';
import { ReportReviewerService } from '../../services/report-reviewer.service';

@Component({
  selector: 'app-report-reviewer-survey-js',
  templateUrl: './report-reviewer-survey-js.component.html',
  styleUrls: ['./report-reviewer-survey-js.component.scss']
})
export class ReportReviewerSurveyJsComponent implements OnInit {

  json ;
  reportReviewer: ReportReviewer = {id:"",name:"",version:"",description:"",status:false,questions:"{}",norm:null}; 
  constructor(private route : ActivatedRoute,private service : ReportReviewerService) { }

  async ngOnInit() {
    await this.service.findReportReviewer(this.route.snapshot.paramMap.get('id')).toPromise().then((data : string)=> this.reportReviewer =JSON.parse(data));
    console.log(this.reportReviewer.questions);
    this.json = JSON.parse(String(this.reportReviewer.questions));
  }

  async onSurveySaved(survey) {
    
    this.json = survey;
    this.reportReviewer.questions = JSON.stringify(this.json);
    console.log(this.json.title);
    this.reportReviewer.name = this.json.title;
    console.log(this.reportReviewer);
    await this.service.update(this.reportReviewer).toPromise().then((data)=> console.log("okay"));
    alert("survey saved !");
}

}
