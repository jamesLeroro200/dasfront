import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
    selector: '[NumericValidator]'
})
export class NumericValidator {
    private regex : RegExp = new RegExp('^[0-9]+(\.[0-9]*){0,1}$');
    private specialkeys: Array<String> = ['Backspace','ArrowLeft','ArrowRight'];
    constructor(private elementRef: ElementRef){}
   /**
    * key board action 
    *@param event
    */
    @HostListener('keydown',['$event'])onkeyDown(event: KeyboardEvent){
        if (this.specialkeys.indexOf(event.key) != -1){
            return;
        }
        const inputValue: string = this.elementRef.nativeElement.value.concat(event.key)
        if (inputValue && !String(inputValue).match(this.regex)){
            event.preventDefault();
            console.log("Numbers only");
        }
        return;
    }
      /**
    * key board action 
    *@param event
    */
   @HostListener('paste',['$event'])onPaste(event){
       const clipboardData = (event.originalEvent || event).clipboardData.getData('text/plain');
       if(clipboardData){
           const regex = new RegExp('^[0-9]+(\.[0-9]*){0,1}$');
           if(!regex.test(clipboardData)){
               event.preventDefault();
           }
       }
    return;
}
}