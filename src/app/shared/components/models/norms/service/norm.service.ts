import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Norm } from '../norm';
import { environment } from 'src/environments/environment';
import { Chapter } from '../chapter';
@Injectable({
  providedIn: 'root'
})
export class NormService {

  baseUrl=environment.baseUrl+"norm";
  //baseUrl="http://localhost:2020/api/norm";
  constructor(private http: HttpClient) { }

  async getList(){
    let list =[] ;
  await this.http.get<Norm[]>(this.baseUrl+"/Norm").toPromise().then((data)=> {
    if(data!=null){
    for (let i = 0 ; i< data.length; i++){
     list.push(data[i]);
   }}});
    return list
  }

  Creat(norm) : Observable<Object>{
    return this.http.post(this.baseUrl+"/NormCreat",norm,{responseType:'text' as 'json'});
  }
  updateNorm(norm){
    return this.http.post(this.baseUrl+"/updateNorm",norm,{responseType:'text' as 'json'});
  }
  delete(id: String): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.baseUrl+"/NormDelete"}/${id}`, { responseType: 'text' });
  }
  find(id) {
    return this.http.get(`${this.baseUrl+"/FindNorm"}/${id}`,{responseType:'text' as 'json'});
  }
  DeletNorm(id){
    return this.http.get(`${this.baseUrl+"/DeleteNorm"}/${id}`,{responseType:'text' as 'json'});
  }
  DeletChapter(id){
    return this.http.get(`${this.baseUrl+"/DeleteChapter"}/${id}`,{responseType:'text' as 'json'});
  }
  DeleteArticle(id){
    return this.http.get(`${this.baseUrl+"/DeleteArticle"}/${id}`,{responseType:'text' as 'json'});
  }
  Chaptercreat(Chapter){
    return this.http.post(this.baseUrl+"/ChapterCreat",Chapter,{responseType:'text' as 'json'});
  }
  ChapterEdit(Chapter){
    return this.http.post(this.baseUrl+"/ChapterUpdate",Chapter,{responseType:'text' as 'json'});
  }
  ArticleCreat(article): Observable<Object>{
    return this.http.post(this.baseUrl+"/ArticleCreat",article,{responseType:'text' as 'json'});
  }
  ArticleCreatReviewer1(article): Observable<Object>{
    return this.http.post(this.baseUrl+"/ArticleCreatReviewer1",article,{responseType:'text' as 'json'});
  }
  ArticleCreatReviewer2(article): Observable<Object>{
    return this.http.post(this.baseUrl+"/ArticleCreatReviewer2",article,{responseType:'text' as 'json'});
  }
  FindChapter(id){
    return this.http.get(`${this.baseUrl+"/FindChapter"}/${id}`,{responseType:'text' as 'json'});
  }
  findArticle(id){
    return this.http.get(`${this.baseUrl+"/FindArticle"}/${id}`,{responseType:'text' as 'json'});
  }
  findArticleReviewer1(article): Observable<Object>{
    return this.http.post(this.baseUrl+"/findArticleReviewer1",article,{responseType:'text' as 'json'});
  }
  findArticleReviewer2(article): Observable<Object>{
    return this.http.post(this.baseUrl+"/findArticleReviewer2",article,{responseType:'text' as 'json'});
  }
   updateArticle(article){
    return this.http.post(this.baseUrl+"/ArticleUpdate",article,{responseType:'text' as 'json'});
  }
  updateArticleReviewer1(article){
    return this.http.post(this.baseUrl+"/ArticleUpdateReviewer1",article,{responseType:'text' as 'json'});
  }
  updateArticleReviewer2(article){
    return this.http.post(this.baseUrl+"/ArticleUpdateReviewer2",article,{responseType:'text' as 'json'});
  }
}
