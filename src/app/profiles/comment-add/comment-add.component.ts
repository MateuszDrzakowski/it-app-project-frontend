import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IComment} from "../icomment";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../comment.service";
import {GenericValidator} from "../../shared/generic.validator";
import {NumberValidators} from "../../shared/number.validator";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css'],
  providers: [DatePipe]
})
export class CommentAddComponent implements OnInit {

  // @ts-ignore
  commentFormGroup: FormGroup;
  // @ts-ignore
  comment: IComment;
  @Input() targetUserId: number = 0;
  private errorMessage: string | any;
  @Output() savedComment: EventEmitter<string> =
    new EventEmitter<string>();

  displayMessage: { [key: string]: string } = {};
  private readonly validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private formBuilder: FormBuilder, private commentService: CommentService,
              private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {

    this.validationMessages = {
      content: {
        required: 'Please enter the data',
        minlength: 'The comment must be longer than 3 characters.',
      },
      rating: {
        required: 'Please enter the rating',
        validateRange: 'Rating must be in range 1-6'
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.commentFormGroup = this.formBuilder.group({
      content:['', [Validators.required, Validators.minLength(3)]],
      rating: [3, NumberValidators.validateRange(1, 6)],
    })

    this.commentFormGroup.valueChanges.subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.commentFormGroup);
    });
  }

  save() {
    console.log('Save comment: ' + JSON.stringify(this.commentFormGroup.value));
    if (this.commentFormGroup.valid) {
      if (this.commentFormGroup.dirty) {
        const commentToSave = {
          "id": null,
          "authorId": 1,
          "targetUserId": this.targetUserId,
          "content": this.commentFormGroup.value.content,
          "create_date": this.getCurrentDate(),
          "rating": this.commentFormGroup.value.rating,
        };

        console.log("comment to save: ", commentToSave);
        this.commentService.saveComment(commentToSave)
          .subscribe({
            next: () => this.onSaveComplete(commentToSave),
            error: err => this.errorMessage = err
          })

      }
    } else {
      this.errorMessage = 'Please correct the validation errors'
    }
  }

  private onSaveComplete(savedComment: IComment) {
    this.commentFormGroup.reset();
    this.savedComment.emit(`The comment: ${JSON.stringify(savedComment)} - was saved!`);
  }

  private getCurrentDate(): string | null {
    const dateObj = new Date();
    let latest_date = this.datePipe.transform(dateObj, 'yyyy-MM-dd hh:mm');
    if(latest_date != null) {
      return latest_date;
    }
    return null;
  }
}
