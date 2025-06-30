import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'core-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent implements OnInit {
  private debauncer:Subject<string>=new Subject<string>();
  private debauncerSuscripcion?:Subscription;

  @Input()
  public placeHolder:string='';

  @Input()
  public intialValue:string=''

  @Output() onDebounce=new EventEmitter<string>;

  @ViewChild('txtInput')
  input!: ElementRef<HTMLInputElement>;


ngOnInit(): void {
  this.debauncerSuscripcion=this.debauncer
  .pipe(
    debounceTime(2000)
  )
  .subscribe(value=>{
    console.log(value)
    this.onDebounce.emit(value)
  })
}

ngOnDestroy(): void {
  this.debauncerSuscripcion?.unsubscribe();
  console.log("Onservable destruido")
}

  onKeyPress(searchTermn:string){
    this.debauncer.next(searchTermn);
  }

}
