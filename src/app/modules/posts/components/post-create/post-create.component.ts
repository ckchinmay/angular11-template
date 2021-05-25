import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../../services/post-service.service';
import { Post } from '../../models/post';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post: Post = new Post();
  submitted = false;
  postForm: any;

  constructor(
    public fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  save() {
    this.postService.createPost(this.postForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.post = new Post();
    this.gotoList();
    this.alertService.success('Post created!');
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/posts']);
  }

}



