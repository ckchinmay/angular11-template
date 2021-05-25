import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from "../../services/post-service.service";
import { ConfirmBoxService } from '@app/core/services';
import { Post } from "../../models/post";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  currentId: number = -1;

  displayDialog: boolean = false;

  post: Post = new Post();
  selectedPost: any;
  newPost: boolean = false;
  cols: any[] = [];
  selectedColumns: any[] = [];
  colors: any[] = [];

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private alertService: ToastrService,
    private confirmBoxService: ConfirmBoxService) {
    this.selectedPost = null;
  }

  ngOnInit() {

    this.reloadData();
    this.cols = [
      { field: 'title', header: 'Title', sort: true },
      { field: 'body', header: 'Body', sort: true },
      { field: 'actions', header: 'Actions', sort: false }
    ];
    this.selectedColumns = this.cols;

    this.colors = [
      { label: 'White', value: 'White' },
      { label: 'Green', value: 'Green' },
      { label: 'Silver', value: 'Silver' },
      { label: 'Black', value: 'Black' },
      { label: 'Red', value: 'Red' },
      { label: 'Maroon', value: 'Maroon' },
      { label: 'Brown', value: 'Brown' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Blue', value: 'Blue' }
    ];
  }

  showDialogToAdd() {
    this.newPost = true;
    this.post = new Post();
    this.displayDialog = true;
  }

  onRowSelect(event: any) {
    this.newPost = false;
    this.post = this.clonePost(event.data);
    this.displayDialog = true;
  }

  clonePost(c: Post): Post {
    const post:Post = Object.assign({}, c);
    return post;
  }

  save() {
    let posts = [...this.posts];
    if (this.newPost) {
      posts.push(this.post);
      this.postService.createPost(this.post)
        .subscribe(data => {
          console.log(data);
          this.handleAddEditSuccess(posts, true);
        }, error => {
          console.log(error);
          this.handleAddEditFailure();
        });
    }
    else {
      posts[this.posts.indexOf(this.selectedPost)] = this.post;
      this.postService.updatePost(this.post.id, this.post)
        .subscribe(data => {
          console.log(data);
          this.handleAddEditSuccess(posts, false);
        }, error => {
          console.log(error);
          this.handleAddEditFailure();
        });
    }


  }

  handleAddEditSuccess(posts: any, isAdd: boolean) {
    this.posts = posts;
    //this.post = null;
    this.displayDialog = false;

    this.post = new Post();
    isAdd ? this.alertService.success('Post created!') : this.alertService.success('Post updated!');
  }

  handleAddEditFailure() {
    this.alertService.error('Post updated falied!');
  }

  delete() {
    this.confirmDeletePost(this.selectedPost.id);
    this.displayDialog = false;
  }

  reloadData() {
    this.posts = this.route.snapshot.data['posts'];
  }

  close() {
    this.selectedPost = null;
  }

  confirmDeletePost(id: number) {
    this.currentId = id;
    this.confirmBoxService.confirmThis("Are you sure you want to delete this record?", this.doDeletePost.bind(this), this.cancelDeletePost.bind(this));
  }

  doDeletePost() {
    this.deletePost(this.currentId);
  }

  cancelDeletePost() {
    this.currentId = -1;
  }

  deletePost(id: number) {
    this.postService.deletePost(id)
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('Post deleted!');
          this.reloadData();
          this.cancelDeletePost();
        },
        error => console.log(error));
  }

  postDetails(id: number) {
    this.router.navigate(['posts/details', id]);
  }

  updatePost(id: number) {
    this.router.navigate(['posts/update', id]);
  }

}
