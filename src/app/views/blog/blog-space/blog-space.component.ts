import {Component, OnInit} from '@angular/core';
import {BlogCard} from "../../../models/blog-card";
import {LIKE_CLASSES} from "../../../constants/constants";
import {BlogService} from "../../../services/blog.service";

@Component({
  selector: 'app-blog-space',
  templateUrl: './blog-space.component.html',
  styleUrls: ['./blog-space.component.css']
})
export class BlogSpaceComponent implements OnInit {

  blogCards = [] as BlogCard[];

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPaginatedBlogCards();
  }

  private resolveInitialLikeClass(cards: BlogCard[]) {
    if(!cards) {
      return;
    }

    for(let card of cards) {
      if(card.isLiked) {
        card.likeClass = LIKE_CLASSES.LIKED_NORMAL;
      } else {
        card.likeClass = LIKE_CLASSES.UNLIKED_NORMAL;
      }
    }
  }

  flipLike(card: BlogCard) {
    card.isLiked = !card.isLiked;
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

  getPaginatedBlogCards() {
    let newPage = this.blogService.getBlogs();
    this.resolveInitialLikeClass(newPage);
    if(newPage) {
      this.blogCards = this.blogCards.concat(newPage);
    }
  }
}
