import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostService } from "../../services/post-service.service";
import { Post } from "../../models/post";

@Injectable()
export class PostListResolver implements Resolve<Observable<Post[]>> {

  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot) {
      return this.postService.getPosts().pipe(
        catchError((err: any, caught: Observable<any>) => {
            return of(null);
        })
    );
      
  }
}