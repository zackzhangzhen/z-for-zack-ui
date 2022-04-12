import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from "../../../services/client/client.service";
import {BlogCard} from "../../../models/blog-card";
import {REPLIES_PER_PAGE} from "../../../constants/constants";
import {BlogService, REPLY_ACTION} from "../../../services/blog/blog.service";
import {filter, Subscription} from "rxjs";


export interface FormattedReply {
  userName: string,
  replyText: string,
  isAuthor: boolean,
}

@Component({
  selector: 'app-reply-panel',
  templateUrl: './reply-panel.component.html',
  styleUrls: ['./reply-panel.component.css']
})
export class ReplyPanelComponent implements OnInit, OnDestroy {

  @Input()
  blog!: BlogCard;
  private subForReplies: Subscription;
  formattedReplies: FormattedReply[]  = [];
  formattedRepliesToShow: FormattedReply[]  = [];
  moreToShowIndex = 0;
  moreToLoad = false;
  repliesHidden = false;

  constructor(private clientService: ClientService,
              private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.subForReplies = this.blogService.replies$.pipe(filter((result:any)=>{
      return result.targetId === this.blog._id ;
    })).subscribe((result:any)=>{
      if (result.action === REPLY_ACTION.UPDATE_REPLIES) {
        this.processFormattedReplies(result.data);
      } else if (result.action === REPLY_ACTION.TOGGLE_REPLIES_PANEL) {
        this.repliesHidden = !this.repliesHidden;
      }
    }, (error:any)=>{
      console.error(error);
    });

    this.processFormattedReplies(this.blog.replies);
  }

  public ngOnDestroy(): void {
    this.subForReplies.unsubscribe();
  }

  showMoreReplies() {
    let startIndex = this.moreToShowIndex - REPLIES_PER_PAGE;
    if (startIndex < 0) {
      this.formattedRepliesToShow = this.formattedReplies.slice(0);
      this.moreToLoad = false;
    } else {
      this.formattedRepliesToShow = this.formattedReplies.slice(startIndex);
      this.moreToLoad = true;
    }
    this.moreToShowIndex = startIndex;
  }

  getUserAgentBasedStyle(style1: string, style2: string) {
    return this.clientService.getUserAgentBasedStyle(style1, style2);
  }

  processFormattedReplies(replies: string[]) {

    if (!replies || replies.length === 0) {
      return ;
    }

    this.formattedReplies = [];

    for (let reply of replies) {
      let fields = reply.split(":");

      let replierId = fields[0];
      let replierName = fields[1];
      let replyDateNum = fields[2];
      let index = replierId.length + replierName.length + replyDateNum.length + 4;
      let replyText = reply.substr(index-1);

      this.formattedReplies.push({
        userName: replierName,
        replyText: replyText,
        isAuthor: replierId === this.blog.author?._id,
      });
    }

    this.moreToShowIndex = this.formattedReplies.length;
    this.showMoreReplies();
  }
}
