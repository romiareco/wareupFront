import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "../layouts";
import { Home } from "../pages/home";
import Loadable from '../components/Loadable';
import { lazy } from 'react';

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

    const MyHome = Loadable(lazy(() => Home));
    //const NotFound = Loadable(lazy(() => import('./NotFound')));
    const SignUp = Loadable(lazy(() => import('../pages/users/SignUp')));
    //const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
    const SignIn = Loadable(lazy(() => import('../pages/users/SignIn')));

  return (
    <Routes>
      <Route path="/" element={loadLayout(UserLayout, MyHome)} />
      <Route path="/signup" element={loadLayout(UserLayout, SignUp)} />
      <Route path="/signin" element={loadLayout(UserLayout, SignIn)} />
    </Routes>
  );
}

/**
 *   { path: '/users/signup', element: <SignUp /> },
  { path: '/users/signin', element: <SignIn /> },
  { path: '/users/forgot-password', element: <ForgotPassword /> },
  { path: '/users/404', element: <NotFound /> }
 */