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
  // Subject para emitir los valores del input con debounce
  private debauncer:Subject<string>=new Subject<string>();
  // Suscripción al observable del debauncer
  private debauncerSuscripcion?:Subscription;

  // Placeholder para el input
  @Input()
  public placeHolder:string='';

  // Valor inicial del input
  @Input()
  public intialValue:string=''

  // Evento que emite el valor después del debounce
  @Output() onDebounce=new EventEmitter<string>;

  // Referencia al input en el template
  @ViewChild('txtInput')
  input!: ElementRef<HTMLInputElement>;

  // Se suscribe al debauncer y emite el valor después de 2 segundos sin cambios
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

  // Limpia la suscripción al destruir el componente
  ngOnDestroy(): void {
    this.debauncerSuscripcion?.unsubscribe();
    console.log("Onservable destruido")
  }

  // Método que se llama en cada pulsación de tecla, emite el valor al debauncer
  onKeyPress(searchTermn:string){
    this.debauncer.next(searchTermn);
  }

}
