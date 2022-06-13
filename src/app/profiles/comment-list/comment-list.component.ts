import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {IComment} from "../icomment";
import {CommentService} from "../comment.service";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges{

  @Input() userId: number = 0;
  @Input() newCommentUploaded: string = '';
  comments: IComment[] = [];
  sub!: Subscription;
  errorMessage: string = '';
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['create_date', 'content', 'rating', 'authorId'];
  // @ts-ignore
  dataSource: MatTableDataSource<IComment>;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.getUserComments();
  }

  private getUserComments() {
    this.sub = this.commentService.getCommentsOfUser(this.userId)
      .subscribe({
        next: comments => {
          this.comments = comments;
          this.dataSource = new MatTableDataSource<IComment>(comments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: error => this.errorMessage = error
      });
  }

  ngOnChanges(): void {
    this.getUserComments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
