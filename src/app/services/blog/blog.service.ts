import {Injectable} from '@angular/core';
import {BlogCard} from "../../models/blog-card";
import {HttpClient} from '@angular/common/http';
import {NODE_JS_BASE_URL, POINT_SYSTEM} from "../../constants/constants";
import {delay, Observable, Subject} from "rxjs";
import {User} from "../../models/user";
import {isObjectNullOrEmpty} from "../../utils/utils";
import {ALERT_CATEGORIES, AlertService} from "../alert/alert.service";

export const REPLY_ACTION = {
  TOGGLE_REPLIES_PANEL: "toggle",
  UPDATE_REPLIES: "update",
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogsPerPage: number = 5;

  private repliesSource = new Subject<{
    targetId: string,
    action: string,
    data: any}>();

  // Observable streams
  public replies$: Observable<any>;

  constructor(private http: HttpClient,
              private alertService: AlertService) {
    this.replies$ = this.repliesSource.asObservable();
  }

  updatedReplies(targetId: string , replies: string[]){
    this.repliesSource.next({
      targetId: targetId,
      action: REPLY_ACTION.UPDATE_REPLIES,
      data: replies,
    });
  }

  toggleRepliesHiddenStatus(targetId: string , hidden: boolean){
    this.repliesSource.next({
      targetId: targetId,
      action: REPLY_ACTION.TOGGLE_REPLIES_PANEL,
      data: hidden,
    });
  }

  getBlogs(pageNumber: number, perPage?: number): Observable<BlogCard[]> {

    return this.http.get<BlogCard[]>(`${NODE_JS_BASE_URL}blogs?page=${pageNumber}` + `${perPage && `&limit=${perPage}` || ''}`)
  }

  /**
   * when the user likes/cancels like for a blog post, update the like number for both entities
   *
   * @param card
   * @param user
   */
  updateLikesForBlogAndUser(card: BlogCard, user: User, cancelLike: boolean) {
    let userLikesIncrement = 1;
    let userCreditsIncrement = POINT_SYSTEM.BLOG_LIKE;
    if (cancelLike) {
      userLikesIncrement = -userLikesIncrement;
      userCreditsIncrement = POINT_SYSTEM.CANCEL_BLOG_LIKE;
    }

    card.isLikeInProgress = true;
    return this.http.patch<any>(`${NODE_JS_BASE_URL}blogs/${card._id}/like?userId=${user._id}&userLikesIncrement=${userLikesIncrement}&userCreditsIncrement=${userCreditsIncrement}`, card)
    .subscribe((result: any) => {
        if (!isObjectNullOrEmpty(result)) {

          if (!isObjectNullOrEmpty(result.blog)) {
            card.likes = result.blog.likes;
            card.likedBy = result.blog.likedBy;
          }

          if (!isObjectNullOrEmpty(result.user)) {
            user.likes = result.user.likes;
            user.credits = result.user.credits;
          }

          if (cancelLike) {
            this.alertService.showError(`${-POINT_SYSTEM.CANCEL_BLOG_LIKE} points deducted for cancelling the like!`, ALERT_CATEGORIES.BLOG_LIKE, card._id!);
          } else {
            this.alertService.showSuccess(`${POINT_SYSTEM.BLOG_LIKE} points added for liking this post!`, ALERT_CATEGORIES.BLOG_LIKE, card._id!);
          }
        }
      },
      (error: any) => {
        console.error(error);
      }).add(() => {
      card.isLikeInProgress = false
    });
  }

  postBlog(formData: FormData){
    return this.http.post(`${NODE_JS_BASE_URL}blogs`, formData)
  }

  replyToBlog(user: User, blog: BlogCard, text: string){
    return this.http.patch(`${NODE_JS_BASE_URL}blogs/${blog._id}/reply`, {
      userId:user._id,
      blogId: blog._id,
      replyText: this.getReplyText(user._id!, user.name, text),
      userCreditsIncrement: POINT_SYSTEM.BLOG_REPLY,
    })
  }

  getReplyText(userId: string, userName: string, text: string) {
    return `${userId}:${userName}:${new Date().getTime()}:${text}`
  }
}
