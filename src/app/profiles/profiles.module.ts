import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentListComponent} from './comment-list/comment-list.component';
import {SharedModule} from "../shared/shared.module";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RouterModule} from "@angular/router";
import {CommentAddComponent} from './comment-add/comment-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {MockedBackendData} from "../mockedBackendData";


@NgModule({
  declarations: [
    CommentListComponent,
    UserProfileComponent,
    CommentAddComponent
  ],
  exports: [
    CommentListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(MockedBackendData),

  ]
})
export class ProfilesModule {
}
