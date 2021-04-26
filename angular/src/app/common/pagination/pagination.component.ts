import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageCounts = [];
  @Input() currentPage;
  @Output() pageChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  switchPage(arg?) {
    this.pageChange.emit(arg);
  }

}
