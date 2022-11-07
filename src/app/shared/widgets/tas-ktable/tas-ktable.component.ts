import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-tas-ktable',
  templateUrl: './tas-ktable.component.html',
  styleUrls: ['./tas-ktable.component.scss']
})
export class TasKTableComponent implements OnInit {

  constructor() { }
  @Input() data = [];
  ngOnInit() {


    //sort list is checked false ->
    
  }
  onAdd(itemTitle){
    this.data.push({title: itemTitle.value, isChecked:false });
    itemTitle.value = null;
  }
  alterCheck(item){
    let index = this.data.indexOf(item);
    if(index == this.data.length-1){
      this.data.splice(-1,1);
    }else{
      this.data.splice(index, 1);
    }
    this.data.push({title : item.title,  isChecked: !item.isChecked});
  }
  onDelet(task){
    let index = this.data.indexOf(task);
  if(index == this.data.length-1){
    this.data.splice(-1,1);
  }else{
    this.data.splice(index, 1);
  }
  }
}
