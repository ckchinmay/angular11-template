import { Post } from '../../models/post';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  id: number;
  post: Post;

  constructor(private route: ActivatedRoute,private router: Router,
    private postService: PostService) { }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];;

  }

  list(){
    this.router.navigate(['posts']);
  }
}

