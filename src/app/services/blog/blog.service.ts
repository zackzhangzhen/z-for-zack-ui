import {Injectable} from '@angular/core';
import {BlogCard} from "../../models/blog-card";
import {HttpClient} from '@angular/common/http';
import {NODE_JS_BASE_URL, POINT_SYSTEM} from "../../constants/constants";
import {Observable, of} from "rxjs";
import {User} from "../../models/user";
import {isObjectNullOrEmpty} from "../../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogsPerPage: number = 5;

  constructor(private http: HttpClient) { }

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
    let userCreditsIncrement = POINT_SYSTEM.LIKE;
    if (cancelLike) {
      userLikesIncrement = -userLikesIncrement;
      userCreditsIncrement = POINT_SYSTEM.CANCEL_LIKE;
    }

    return this.http.patch<any>(`${NODE_JS_BASE_URL}blogs/${card._id}?userId=${user._id}&userLikesIncrement=${userLikesIncrement}&userCreditsIncrement=${userCreditsIncrement}`, card).subscribe((result: any) => {

        if (!isObjectNullOrEmpty(result)) {

          if (!isObjectNullOrEmpty(result.blog)) {
            card.likes = result.blog.likes;
            card.likedBy = result.blog.likedBy;
          }

          if (!isObjectNullOrEmpty(result.user)) {
            user.likes = result.user.likes;
            user.credits = result.user.credits;
          }
        }
      },
      (error: any) => {
        console.error(error);
      });
  }
}
