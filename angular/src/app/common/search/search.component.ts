import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  @Output() searchEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  search(term?) {
    this.searchEvent.emit(term)
  }

}
