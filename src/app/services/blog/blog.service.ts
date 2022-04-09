import {Injectable} from '@angular/core';
import {BlogCard} from "../../models/blog-card";
import {HttpClient} from '@angular/common/http';
import {NODE_JS_BASE_URL} from "../../constants/constants";
import {Observable, of} from "rxjs";
import {User} from "../../models/user";

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
  updateLikesForBlogAndUser(card: BlogCard, user: User) {
    return this.http.patch<any>(`${NODE_JS_BASE_URL}blogs/${card._id}?userId=${user._id}&userLikes=${user.likes}&userCredits=${user.credits}`, card).subscribe((value: any) => {
      },
      (error: any) => {
        console.error(error);
      });
  }
}
