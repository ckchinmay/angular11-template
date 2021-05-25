import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {

  id: number = -1;
  post: Post;

  constructor(private route: ActivatedRoute, private router: Router,
    private postService: PostService,
    private alertService: ToastrService) {
      this.post = new Post();
     }

  ngOnInit() {
    

    this.id = this.route.snapshot.params['id'];

    this.postService.getPost(this.id)
      .subscribe(data => {
        console.log(data)
        this.post = data;
      }, error => console.log(error));
  }

  updatePost() {
    this.postService.updatePost(this.id, this.post)
      .subscribe(data => console.log(data), error => console.log(error));
    this.post = new Post();
    this.gotoList();
    this.alertService.success('Post updated!');
  }

  onSubmit() {
    this.updatePost();
  }

  gotoList() {
    this.router.navigate(['/posts']);
  }
}





