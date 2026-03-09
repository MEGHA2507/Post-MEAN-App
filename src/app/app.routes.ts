import { Routes } from '@angular/router';
import { PostList } from './post-list/post-list';
import { PostCreate } from './post-create/post-create';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./post-list/post-list').then(c => c.PostList)
    },
    {
        path: 'createPost',
        loadComponent: () => import('./post-create/post-create').then(c => c.PostCreate),
        canActivate: [authGuard]
    },
    {
        path: 'editPost/:id',
        loadComponent: () => import('./post-create/post-create').then(c => c.PostCreate),
        canActivate: [authGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('./signup/signup').then(c => c.Signup),

    },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(c => c.Login),

    }
];
