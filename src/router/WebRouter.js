import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "../layouts";
import { Welcome } from "../pages/welcome";
import {SignUp, SignIn} from "../pages/users";
import {useAuth} from "../hooks";
import {Home} from "../pages/home";

export function WebRouter() {
  const {user} = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user? (
        <>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/signup" element={loadLayout(UserLayout, SignUp)} />
          <Route path="/users/signin" element={loadLayout(UserLayout, SignIn)} />
        </>
      ) : (
        <Route path="/home" element={loadLayout(UserLayout, Home)} />
      )
      }
      
    </Routes>
  );
}

/**
 *   { path: '/users/signup', element: <SignUp /> },
  { path: '/users/signin', element: <SignIn /> },
  { path: '/users/forgot-password', element: <ForgotPassword /> },
  { path: '/users/404', element: <NotFound /> }
 */