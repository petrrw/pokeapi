import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {


  @Output() searchTextChanged = new EventEmitter<string>();
  @Input() labelText$: Observable<string> = new Observable<string>()
  labelText = ""
  constructor() { }

  ngOnInit(): void {
    this.labelText$.subscribe({next: (text) => 
    this.labelText = text
    })
  }

  onSearchTextChanged(text: string){
    this.searchTextChanged.emit(text)
  }

}
