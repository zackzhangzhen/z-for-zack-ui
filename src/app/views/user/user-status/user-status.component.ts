import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {LevelService} from "../../../services/user/level.service";
import {Level} from "../../../models/level";
import {Rank} from "../../../models/rank";
import {toDateString} from "../../../utils/utils";
import {ClientService} from "../../../services/client/client.service";

interface TimelineItem {
  rank: Rank,
  level: Level,
}

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  isLoading = false;
  levels: Level[] = [];
  ranks: Rank[] = [];
  timelineItems: TimelineItem[] =[];
  inProgressRank = -1;
  constructor(public userService: UserService,
              private levelService: LevelService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.isLoading = true;
      this.levelService.getLevelsByUserId(this.userService.currentUser._id!).subscribe((levels:Level[])=>{
        this.levels = levels;

        this.levelService.getRanks().subscribe((ranks: Rank[])=>{
          this.ranks = ranks;
          this.resolveLevelling();
        },(error:any)=>{
          console.error(error);
        } )

      }, (error:any)=>{
        console.error(error);
      }).add(() => {
        this.isLoading = false;
      });;
    }
  }

  public getContainerPadding() {
    if (this.clientService.isMobileClient()) {
      return "padding:1rem";
    }

    return "padding:2rem";
  }

  public getTimelineItemDate(item: TimelineItem){
    if (item.level && item.level.date) {
      return toDateString(item.level.date);
    }
    if (item.level && !item.level.date) {
      return "Unknown";
    }

    if (!item.level) {
      return "TBD";
    }

    return "Unknown;"
  }

  public isRankReached(item: TimelineItem) {
    return item && item.level;
  }

  public isRankInProgress(item: TimelineItem) {
    return item && item.rank.ordinal === this.inProgressRank;
  }

  public isRankNotReachedAndNotInProgress(item: TimelineItem) {
    return !this.isRankReached(item) && !this.isRankInProgress(item);
  }

  resolveLevelling() {

    let rankInProgressFound = false;
    for (let rank of this.ranks) {
      let level = this.getLevelForRank(rank);
      if (!level && !rankInProgressFound) {
        rankInProgressFound = true;
        this.inProgressRank = rank.ordinal;
      }
      this.timelineItems.push({
        rank: rank,
        level: level,
      })
    }
  }

  getLevelForRank(rank: Rank){
    for (let level of this.levels) {
      if (level.currentRank._id === rank._id) {
        return level;
      }
    }

    return null;
  }

}
