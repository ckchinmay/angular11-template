import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostService } from "../../services/post-service.service";
import { Post } from "../../models/post";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PostDetailsResolver implements Resolve<Observable<Post>> {

  constructor(private router: Router,
    private postService: PostService,
    private alertService: ToastrService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    return this.postService.getPost(Number(id)).pipe(
      catchError((err: any, caught: Observable<any>) => {
        this.alertService.error(err.error);
        this.router.navigate(['/']);
        return of(null);
      })

    );

  }
}