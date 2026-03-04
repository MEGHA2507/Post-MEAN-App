import { Routes } from '@angular/router';
import { PostList } from './post-list/post-list';
import { PostCreate } from './post-create/post-create';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {
        path:'',
        component: PostList
    },
    {
        path: 'createPost',
        component: PostCreate,
        canActivate: [authGuard]
    },
    {
        path: 'editPost/:id',
        component: PostCreate,
          canActivate: [authGuard]
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
