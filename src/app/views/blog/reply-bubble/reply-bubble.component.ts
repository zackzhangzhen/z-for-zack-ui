import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {BlogCard} from "../../../models/blog-card";
import {BlogService, REPLY_ACTION} from "../../../services/blog/blog.service";
import {isObjectNullOrEmpty} from "../../../utils/utils";
import {ALERT_CATEGORIES, AlertService} from "../../../services/alert/alert.service";
import {POINT_SYSTEM} from "../../../constants/constants";
import {UserService} from "../../../services/user/user.service";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-reply-bubble',
  templateUrl: './reply-bubble.component.html',
  styleUrls: ['./reply-bubble.component.css']
})
export class ReplyBubbleComponent implements OnInit {

  text = "";

  @Input()
  user!: User;

  @Input()
  secondReplyBubble = false;

  @Output()
  onReplyClicked = new EventEmitter<any>();

  @Input()
  blog!: BlogCard;
  showBubble = false;
  @Input()
  repliesHidden = false;
  @Output()
  repliesHiddenChange = new EventEmitter<boolean>();

  private subForReplies: Subscription;

  constructor(private blogService: BlogService,
              private alertService: AlertService,
              public userService: UserService) { }

  ngOnInit(): void {
    this.subForReplies = this.blogService.replies$.pipe(filter((result:any)=>{
      return result.targetId === this.blog._id ;
    })).subscribe((result:any)=>{
     if (result.action === REPLY_ACTION.TOGGLE_REPLIES_PANEL) {
        this.repliesHidden = result.data;
      }
    }, (error:any)=>{
      console.error(error);
    });
  }

  public ngOnDestroy(): void {
    this.subForReplies.unsubscribe();
  }

  isReplyDisabled() {
   return !(!!this.text );
  }

  submitReply() {
    this.blogService.replyToBlog(this.user, this.blog, this.text).subscribe((result: any) => {
      if (!isObjectNullOrEmpty(result) && result.replies) {
        this.blog.replies = result.replies;
        this.user.credits = result.userCredits;
        this.alertService.showSuccess(`${POINT_SYSTEM.BLOG_REPLY} points added for replying to this post!`, ALERT_CATEGORIES.BLOG_REPLY, this.blog._id!);
        this.text = "";
        this.blogService.updatedReplies(this.blog._id!, this.blog.replies);
      }
    }, (error: any) => {
      console.log(error)
    });
    this.showBubble = false;
  }

  flipRepliesHiddenStatus() {
    this.repliesHidden = !this.repliesHidden;
    this.blogService.toggleRepliesHiddenStatus(this.blog._id!, this.repliesHidden);
    // this.repliesHiddenChange.emit(this.repliesHidden);
  }
}
