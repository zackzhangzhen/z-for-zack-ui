import {Component, OnInit} from '@angular/core';
import {BlogCard} from "../../../models/blog-card";
import {LIKE_CLASSES} from "../../../constants/constants";
import {BlogService} from "../../../services/blog.service";
import {Paginator} from "../../../models/paginator";
import {toDateString} from "../../../utils/utils";

@Component({
  selector: 'app-blog-space',
  templateUrl: './blog-space.component.html',
  styleUrls: ['./blog-space.component.css']
})
export class BlogSpaceComponent implements OnInit {

  blogCards = [] as BlogCard[];
  blogPaginator = new Paginator<BlogCard>();
  newBlogPageLoading = true;

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPaginatedBlogCards();
    let i = "";
  }

  private resolveInitialLikeClass(cards: BlogCard[]) {
    if(!cards) {
      return;
    }

    for(let card of cards) {
      if(card.liked) {
        card.likeClass = LIKE_CLASSES.LIKED_NORMAL;
      } else {
        card.likeClass = LIKE_CLASSES.UNLIKED_NORMAL;
      }
    }
  }

  flipLike(card: BlogCard) {
    card.liked = !card.liked;
  }

  enlargeLike(card: BlogCard, liked: boolean) {
    if (liked) {
      card.likeClass = LIKE_CLASSES.LIKED_LARGE;
    } else {
      card.likeClass = LIKE_CLASSES.UNLIKED_LARGE;
    }
  }

  shrinkLike(card: BlogCard, liked: boolean) {
    if (liked) {
      card.likeClass = LIKE_CLASSES.LIKED_NORMAL;
    } else {
      card.likeClass = LIKE_CLASSES.UNLIKED_NORMAL;
    }
  }

  /**
   * Get the next page of blogs, prefetch one more page when necessary to determine whether there's more to load
   */
  getPaginatedBlogCards() {
    this.blogService.getBlogs(this.blogPaginator.currentPage + 1, this.blogPaginator.itemsPerPage).subscribe((page: BlogCard[]) => {
      this.processNewPage(page);
      this.newBlogPageLoading = false;
    });
  }

  async processNewPage(newPage: BlogCard[]) {
    let noMorePages;
    this.resolveInitialLikeClass(newPage);
    if (newPage) {
      this.blogPaginator.addPage(newPage);
      if (newPage.length !== this.blogPaginator.itemsPerPage) {
        noMorePages = true;
      } else {
        let preFetchedPage = await this.blogService.getBlogs(this.blogPaginator.currentPage + 1, this.blogPaginator.itemsPerPage).toPromise();
        if (preFetchedPage && preFetchedPage.length > 0) {
          noMorePages = false;
        } else {
          noMorePages = true;
        }
      }
    } else {
      noMorePages = true;
    }
    this.blogPaginator.moreToLoad = !noMorePages;
  }

  getDateString(date: Date): string {
    return toDateString(date);
  }
}
