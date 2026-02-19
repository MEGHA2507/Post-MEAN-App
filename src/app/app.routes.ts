import { Routes } from '@angular/router';
import { PostList } from './post-list/post-list';
import { PostCreate } from './post-create/post-create';

export const routes: Routes = [
    {
        path:'',
        component: PostList
    },
    {
        path: 'createPost',
        component: PostCreate
    },
    {
        path: 'editPost/:id',
        component: PostCreate
    }
];
