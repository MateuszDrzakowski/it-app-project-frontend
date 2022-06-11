import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../icomment";
import {OfferService} from "../../offers/offer.service";
import {CommentService} from "../comment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() userId: number = 0;
  comments: IComment[] = [];
  sub!: Subscription;
  errorMessage: string = '';


  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.sub = this.commentService.getCommentsOfUser(this.userId)
      .subscribe({
        next: comments  => {
          this.comments = comments;
        },
        error: error => this.errorMessage = error
      });
  }

}
