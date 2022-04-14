import {Component, OnInit} from '@angular/core';
import {BlogCard} from "../../../models/blog-card";
import {BLOG_IMAGE_FOLDER, LIKE_CLASSES, POINT_SYSTEM} from "../../../constants/constants";
import {BlogService} from "../../../services/blog/blog.service";
import {Paginator} from "../../../models/paginator";
import {deleteFromArray, isVideo, processPointsForLike, toDateString} from "../../../utils/utils";
import {ALERT_CATEGORIES, AlertService} from "../../../services/alert/alert.service";
import {TopAlertService} from "../../../services/alert/top-alert.service";
import {ClientService} from "../../../services/client/client.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-blog-space',
  templateUrl: './blog-space.component.html',
  styleUrls: ['./blog-space.component.css']
})
export class BlogSpaceComponent implements OnInit {

  blogCards = [] as BlogCard[];
  blogPaginator = new Paginator<BlogCard>();
  newBlogPageLoading = true;
  loadingMore = false;
  ALERT_KINDS = ALERT_CATEGORIES;
  BLOG_IMAGE_DIR = BLOG_IMAGE_FOLDER;
  repliesHidden = false;
  constructor(private blogService: BlogService,
              private alertService: AlertService,
              private topAlertService: TopAlertService,
              private clientService: ClientService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.getPaginatedBlogCards();
  }

  flipLike(card: BlogCard) {
    // guests cannot click
    if (!this.userService.isLoggedIn()) {
      return;
    }
    let user = this.userService.currentUser;
    if (!this.isLikedByCurrentUser(card)) {
      this.blogService.updateLikesForBlogAndUser(card, user, false);
    } else {
      this.blogService.updateLikesForBlogAndUser(card, user, true);
    }
  }

  /**
   * Get the next page of blogs, prefetch one more page when necessary to determine whether there's more to load
   */
  getPaginatedBlogCards() {
    this.loadingMore = true;
    this.blogService.getBlogs(this.blogPaginator.currentPage + 1, this.blogPaginator.itemsPerPage).
    subscribe((page: BlogCard[]) => {
        this.processNewPage(page);
        this.newBlogPageLoading = false;
        this.loadingMore = false;
      },
      (error:any) => {
        console.log(`failed to fetch blogs: ${error}`);
        this.loadingMore = false;
      }
    );
  }

  async processNewPage(newPage: BlogCard[]) {
    let noMorePages;
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

  getUserAgentBasedStyle(style1: string, style2: string) {
    return this.clientService.getUserAgentBasedStyle(style1, style2);
  }

  isLikedByCurrentUser(card: BlogCard) {
    let user = this.userService.currentUser;
    return card.likedBy && card.likedBy.includes(user._id!);
  }

  isMobile(){
    return this.clientService.isMobileClient();
  }

  isVideo(fileName: string) {
    return isVideo(fileName);
  }
}
