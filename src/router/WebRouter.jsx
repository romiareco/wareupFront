import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "../layouts";
import { Home } from "../pages/home";
import {SignUp, SignIn} from "../pages/users";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/signup" element={loadLayout(UserLayout, SignUp)} />
      <Route path="/users/signin" element={loadLayout(UserLayout, SignIn)} />
    </Routes>
  );
}

/**
 *   { path: '/users/signup', element: <SignUp /> },
  { path: '/users/signin', element: <SignIn /> },
  { path: '/users/forgot-password', element: <ForgotPassword /> },
  { path: '/users/404', element: <NotFound /> }
 */