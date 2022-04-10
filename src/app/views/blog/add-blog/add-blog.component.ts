import { Component, OnInit } from '@angular/core';
import {NODE_JS_BASE_URL} from "../../../constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogService} from "../../../services/blog/blog.service";
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
              private blogService: BlogService) {
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


   this.blogService.postBlog(formData)
    .subscribe(res => {
      console.log(res);
      this.isModalOpened = false;
    })
  }

  onFileChange(event:any) {

    // let reader = new FileReader();
    //
    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //
    //   reader.onload = () => {
    //     this.form.patchValue({
    //       imageSource: reader.result
    //     });
    //
    //     // need to run CD since file load runs outside of zone
    //     // this.cd.markForCheck();
    //   };
    // }


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
