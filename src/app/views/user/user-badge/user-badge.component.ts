import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent implements OnInit {

  user = {} as User;
  confirmPwd = "";
  isModalOpened = false ;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    // this.userService.getUserById("").subscribe((user: User)=>{
    //
    // })
  }

  signIn(name: string, pwd: string) {
    this.userService.signIn(name, pwd).subscribe((user: User) => {
        if (!user) {
          console.error(`$no matching user found for ${name}`);
          this.clearUserInfo();
        } else {
          this.user = user;
          this.isModalOpened = false;
        }
      },
      error => {
        console.error(error)
      })
  }

  isSignedIn() {
    return !!this.user && Object.keys(this.user).length !== 0 && !this.isModalOpened;
  }

  isModalSubmitEnabled() {
    return this.user && this.user.name && this.user.password && this.confirmPwd === this.user.password;
  }

  openModal() {
    this.isModalOpened = true;
  }

  clearUserInfo() {
    this.user = {} as User;
    this.confirmPwd = "";
  }
}
