import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../../services/blog/blog.service";
import {UserService} from "../../../services/user/user.service";
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  isModalOpened = false;
  text = "";
  title = "";
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private blogService: BlogService,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', Validators.required],
      imageSource: ['']
    });
  }

  ngOnInit(): void {
  }

  isModalSubmitEnabled() {
    return !!this.form.get('title')?.value && !!this.form.get('text')?.value;
  }

  submit() {

    const formData = new FormData();

    formData.append('title', this.form.get('title')?.value);
    formData.append('text', this.form.get('text')?.value);
    formData.append('image', this.form.get('imageSource')?.value);
    formData.append("authorId", this.userService.currentUser._id!);

   this.blogService.postBlog(formData)
    .subscribe((res:any) => {
      console.log(res);
      this.isModalOpened = false;
    })
  }

  onFileChange(event:any) {

    if (!event) {
      return;
    }

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.form.patchValue({

        imageSource: file

      });
    }
  }
}
