import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import {SharedModule} from "../shared/shared.module";
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
    declarations: [
        CommentListComponent,
        UserProfileComponent
    ],
    exports: [
        CommentListComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ProfilesModule { }
