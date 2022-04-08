import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user";
import {isObjectNullOrEmpty} from "../../../utils/utils";
import {USER_PWD_MIN_LENGTH} from "../../../constants/constants";
import {Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent implements OnInit {

  user = {} as User;
  confirmPwd = "";
  isSignUpModalOpened = false ;
  isLogInModalOpened = false ;
  isSignUpCongratsModalOpened = false ;
  logInFailed = false;
  signUpFailed = false;
  userNameTaken = false;

  private signUpCongratsSource = new Subject<User>();
  private signUpCongrats$: Observable<User>;
  private signUpCongratsSub: Subscription;

  constructor(private userService: UserService) {
    this.signUpCongrats$ = this.signUpCongratsSource.asObservable();
    this.signUpCongratsSub = this.signUpCongrats$.subscribe((user:User)=>{this.isSignUpCongratsModalOpened= true});
  }

  ngOnInit(): void {
    // this.userService.getUserById("").subscribe((user: User)=>{
    //
    // })
  }

  public ngOnDestroy(): void {
    this.signUpCongratsSub.unsubscribe();
  }

  logIn(name: string, pwd: string) {
    this.logInFailed = false;
    this.userService.logIn(name, pwd).subscribe((user: User) => {
        if (!user) {
          console.error(`no matching user found for ${name}`);
          this.logInFailed = true;
        } else {
          this.user = user;
          this.logInFailed = false;
          this.isLogInModalOpened = false;
        }
      },
      (error:any) => {
        console.error(error);
        this.logInFailed = true;
      })
  }

  signUp(vip: boolean, admin = false ) {
    this.userNameTaken = false;
    this.signUpFailed = false;
    this.userService.getUserByName(this.user.name).subscribe((users: User[]) => {
        if (!users || users.length == 0) {
          this.addNewUser(vip, admin);
        } else {
          console.log(`user name ${this.user.name} already exists`)
          this.userNameTaken = true;
        }
      },
      (resp:any) => {
       if(resp && resp.status === 404) {
         this.addNewUser(vip, admin);
       } else {
         console.error(resp);
         this.signUpFailed = true;
         this.userNameTaken = false;
       }
      });
  }

  addNewUser(vip: boolean, admin: boolean) {
    delete this.user._id;
    this.user.vip = vip;
    this.user.admin = admin;
    this.user.credits = 0;
    this.user.level = 1;
    this.user.likes = 0;
    this.userService.create(this.user).subscribe((resp: any) => {
        if (!resp || !resp._id) {
          console.error(`creating user failed for ${name}`);
          this.signUpFailed = true;
        } else {
          this.user._id = resp._id;
          this.signUpFailed = false;
          this.isSignUpModalOpened = false;
          this.signUpCongratsSource.next(this.user);
        }
      },
      (error:any) => {
        console.error(error);
        this.signUpFailed = true;
      })
  }

  isLoggedIn() {
    // when the sign in modal is open, user can see through the translucent mask layer
    // and see the user badge and the content typed into the modal will show if
    // "isLogInModalOpened" or "isSignUpMModalOpened" is not checked here
    return !isObjectNullOrEmpty(this.user) && !this.isLogInModalOpened && !this.isSignUpModalOpened;
  }

  isSignUpModalSubmitEnabled() {
    return this.user && this.user.name && this.user.password && this.confirmPwd === this.user.password;
  }

  isLogInModalSubmitEnabled() {
    return this.user && this.user.name && this.user.password;
  }

  showPasswordLengthAlert(){
    if (isObjectNullOrEmpty(this.user) || !this.user.password) {
      return false;
    }

    return this.user.password.length < USER_PWD_MIN_LENGTH;
  }

  showPasswordMatchAlert(){
    if (isObjectNullOrEmpty(this.user) || !this.user.password || !this.confirmPwd) {
      return false;
    }

    if (this.user.password === this.confirmPwd) {
      return false;
    }

    return true;
  }

  openSignUpModal() {
    this.isSignUpModalOpened = true;
  }

  openLogInModal() {
    this.isLogInModalOpened = true;
  }

  clearUserInfo() {
    this.user = {} as User;
    this.confirmPwd = "";
    this.logInFailed = false;
    this.signUpFailed = false;
    this.userNameTaken = false;
  }
}
