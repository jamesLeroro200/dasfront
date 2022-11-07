import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { delay } from 'q';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog/delete-confirmation/delete-confirmation.component';
import { Chapter } from 'src/app/shared/components/models/norms/chapter';
import { Norm } from 'src/app/shared/components/models/norms/norm';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-norm-chapter',
  templateUrl: './norm-chapter.component.html',
  styleUrls: ['./norm-chapter.component.scss']
})
export class NormChapterComponent implements OnInit {
  norm : Norm ;
  searchKey: String;
  LisData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumn: string[] = ['title','actions'];
  constructor(private route : ActivatedRoute, private service : NormService, public router : Router, public deletDialog: MatDialog,private SpinnerService: NgxSpinnerService) { }

  async ngOnInit() {
    this.SpinnerService.show(); 
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    let resp = this.service.find(id);
    await resp.toPromise().then((data:string)=> this.norm = JSON.parse(data));
    this.LisData =new MatTableDataSource(this.norm.chapters);
    this.SpinnerService.hide();
  }
  onUpdate(row){
    this.router.navigate(['/Norms/NormArticles',row.id]);
  }
  onDelet(row){
    let index = this.LisData.data.indexOf(row);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      {data : {message : "Are you sure you want to delete "+row.title+ "?"}});
      dialogRef.afterClosed().subscribe(result => {
        if (result == true){
          this.service.DeletChapter(row.id).subscribe((data)=>{
            console.log("success");
       });
          if(index == this.LisData.data.length-1){
            this.LisData.data.splice(-1,1);
            this.LisData._updateChangeSubscription();
          }else{
            this.LisData.data.splice(index, 1);
            this.LisData._updateChangeSubscription();
          }
        }
      });
  }
  async onCreat(): Promise<void>{
    let index = this.LisData.data.length;
    let newChapter = {id : "", title: "chapter"+index,articles: []};
    this.LisData.data.push(newChapter);
    this.LisData._updateChangeSubscription();
    await this.service.Chaptercreat(newChapter).toPromise().then((data : string) => newChapter.id = JSON.parse(data).id);
    console.log(this.norm);
    await this.service.updateNorm(this.norm).toPromise().then((data) => console.log("data"));
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.LisData.filter = this.searchKey.trim().toLowerCase();
  }
}
