import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {


  // pager object
  pager: any = {};
  @Output() click = new EventEmitter<string>();

  @Input() TotalPages : number;
  @Input() SelectedPage : number;
  @Input() PageSize : number;

  constructor() { }

  ngOnInit() {
    
    this.setPage(this.SelectedPage);
  }

  setPage(page: number) {
    this.pager = this.getPager(this.TotalPages, page, this.PageSize);
  }

  getIndex(Page) {
    this.click.next(Page);
  }


  ngOnChanges() {
    this.setPage(this.SelectedPage);
  }
  
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems); 
    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }
}
