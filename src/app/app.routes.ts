import { Routes } from '@angular/router';
import { PostList } from './post-list/post-list';
import { PostCreate } from './post-create/post-create';
import { Signup } from './signup/signup';
import { Login } from './login/login';

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
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'login',
        component: Login
    }
];
