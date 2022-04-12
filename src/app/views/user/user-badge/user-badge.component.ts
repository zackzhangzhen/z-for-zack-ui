import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user";
import {isObjectNullOrEmpty} from "../../../utils/utils";
import {COOKIE_NAME_USER_ID, TABS, USER_PWD_MIN_LENGTH} from "../../../constants/constants";
import {Observable, Subject, Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {ClientService} from "../../../services/client/client.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent implements OnInit, OnDestroy {

  MENU_TABS= TABS;
  user = {} as User;
  isSignUpModalOpened = false ;
  isLogInModalOpened = false ;
  isSignUpCongratsModalOpened = false ;
  logInFailed = false;
  signUpFailed = false;
  userNameTaken = false;

  form!: FormGroup;

  private signUpCongratsSource = new Subject<User>();
  private signUpCongrats$: Observable<User>;
  private signUpCongratsSub: Subscription;

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private clientService: ClientService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.signUpCongrats$ = this.signUpCongratsSource.asObservable();
    this.signUpCongratsSub = this.signUpCongrats$.subscribe((user:User)=>{this.isSignUpCongratsModalOpened= true});

    this.form = this.createFormGroup();
  }

  createFormGroup(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUserFromCookie();
  }

  getUserFromCookie(){
    let userId = this.cookieService.get(COOKIE_NAME_USER_ID)
    if (!userId) {
      return;
    }
    this.userService.getUserById(userId).subscribe((user: User)=>{
      this.user = user;
      this.userService.currentUser = user;
    },
      (error:any)=>{
      console.error(error)
      })
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
          this.userService.currentUser = user;

          this.clientService.setCookieCustomized(COOKIE_NAME_USER_ID, this.user._id!);
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
    this.userService.getUserByName(this.form.get("name")?.value).subscribe((users: User[]) => {
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
    let newUser = {
      name: this.form.get("name")?.value,
      password: this.form.get("password")?.value,
      vip: vip,
      admin: admin,
      credits: 0,
      level: 1,
      likes: 0,
    } as User;

    this.userService.create(newUser).subscribe((resp: any) => {
        if (!resp || !resp._id) {
          console.error(`creating user failed for ${name}`);
          this.signUpFailed = true;
        } else {
          newUser._id = resp._id;
          this.user = newUser;
          this.userService.currentUser = this.user;
          this.signUpFailed = false;
          this.isSignUpModalOpened = false;
          this.signUpCongratsSource.next(this.user);
          this.clientService.setCookieCustomized(COOKIE_NAME_USER_ID, this.user._id!)
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
    return this.form.get("name")?.value && this.form.get("password")?.value && this.form.get("password")?.value === this.form.get("confirmPassword")?.value;
  }

  isLogInModalSubmitEnabled() {
    return this.user && this.user.name && this.user.password;
  }

  showPasswordLengthAlert(){
    if (!this.form.get("password")?.touched || !this.form.get("password")?.dirty) {
      return false;
    }

    return this.form.get("password")?.value.length < USER_PWD_MIN_LENGTH;
  }

  showPasswordMatchAlert(){
    if(!this.form.get("confirmPassword")?.dirty || !this.form.get("confirmPassword")?.touched) {
      return false;
    }

    return this.form.get("confirmPassword")?.value !== this.form.get("password")?.value;;
  }

  openSignUpModal() {
    this.isSignUpModalOpened = true;
  }

  openLogInModal() {
    this.isLogInModalOpened = true;
  }

  clearUserInfo() {

    this.form = this.createFormGroup();
    this.user = {} as User;
    this.logInFailed = false;
    this.signUpFailed = false;
    this.userNameTaken = false;
    this.userService.currentUser = {} as User;
    this.cookieService.delete(COOKIE_NAME_USER_ID);
    this.isSignUpModalOpened = false;
  }

  getUserAgentBasedStyle(style1: string, style2: string) {
    return this.clientService.getUserAgentBasedStyle(style1, style2);
  }

  isMobile(){
    return this.clientService.isMobileClient();
  }

  goToTab(tab: string) {
    this.router.navigate(['/main'], { queryParams: { tab: tab} });
  }
}
