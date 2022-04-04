import {ITEMS_PER_PAGE_DEFAULT} from "../constants/constants";

export class Paginator<T> {
  currentPage: number = -1;
  items: T[][] = [];
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT;
  private noMorePages = true;

  addPage(newPage: T[]) {
    this.items.push(newPage);
    this.currentPage++;
  }

  getCurrentPage(): T[] {
    if (!this.items || this.currentPage < 0) {
      return [];
    }
    return this.items[this.currentPage];
  }

  getPage(pageNumber: number): T[] {

    if (!!pageNumber || pageNumber < 0 || pageNumber > this.currentPage) {
      throw `invalid page number ${pageNumber}, current page is ${this.currentPage}`;
    }

    return this.items[pageNumber];
  }

  get moreToLoad() {
    return !this.noMorePages
  }

  set moreToLoad(more) {
    this.noMorePages = !more;
  }
}