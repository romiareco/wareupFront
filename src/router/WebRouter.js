import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "../layouts";
import {
  Welcome,
  UserProfile,
  UserStorages,
  UserHasStorage,
  Contact,
} from "../pages";
import { Login, Register, ForgotPassword } from "../components/Auth";
import { NotFound } from "../components";
import { useAuth } from "../hooks";
import { Home } from "../pages/home";

export function WebRouter() {
  const { user } = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/forgot-password" element={<ForgotPassword />} />
          <Route path="/users/404" element={<NotFound />} />
          <Route path="/contacts" element={<Contact />} />
        </>
      ) : (
        <>
          <Route path="/home" element={loadLayout(UserLayout, Home)} />
          <Route
            path="/users/profile"
            element={loadLayout(UserLayout, UserProfile)}
          />
          <Route
            path="/users/my-storages"
            element={loadLayout(UserLayout, UserStorages)}
          />
          <Route
            path="/users/new-storage"
            element={loadLayout(UserLayout, UserHasStorage)}
          />
          <Route path="/contacts" element={loadLayout(UserLayout, Contact)} />
        </>
      )}
      <Route path="*" element={<NotFound />} />{" "}
      {/* Captura cualquier ruta no encontrada */}
    </Routes>
  );
}
