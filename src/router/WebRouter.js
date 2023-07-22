import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout, AdminLayout } from "../layouts";
import {
  Welcome,
  UserProfile,
  UserStorages,
  UserHasStorage,
  Contact,
  UserCompanies,
} from "../pages";
import {
  Login,
  RegisterUser,
  ForgotPassword,
  RegisterCompany,
  PasswordRecovery,
} from "../components/Forms";
import { NotFound } from "../components";
import { useAuth } from "../hooks";
import { Home } from "../pages/home";
import { role } from "../utils";

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
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/forgot-password" element={<ForgotPassword />} />
          <Route path="/users/404" element={<NotFound />} />
          <Route path="/contacts" element={<Contact />} />
          <Route
            path="/users/password-recovery"
            element={<PasswordRecovery />}
          />
        </>
      ) : (
        <>
          <Route path="/users/home" element={loadLayout(UserLayout, Home)} />
          <Route
            path="/users/profile"
            element={loadLayout(UserLayout, UserProfile)}
          />
          <Route
            path="/users/my-storages"
            element={loadLayout(UserLayout, UserStorages)}
          />
          <Route
            path="/users/has-storage"
            element={loadLayout(UserLayout, UserHasStorage)}
          />
          <Route
            path="/users/my-companies"
            element={loadLayout(UserLayout, UserCompanies)}
          />
          <Route
            path="/users/my-companies/register"
            element={loadLayout(UserLayout, RegisterCompany)}
          />
          <Route path="/contacts" element={loadLayout(UserLayout, Contact)} />

          {user.role === role.ADMIN && (
            <>
              <Route
                path="/admin/home"
                element={loadLayout(AdminLayout, AdminDashboard)}
              />
              <Route
                path="/admin/manage-users"
                element={loadLayout(AdminLayout, AdminUsers)}
              />
              <Route
                path="/admin/manage-deposits"
                element={loadLayout(AdminLayout, AdminCompanies)}
              />
              <Route
                path="/admin/manage-requests"
                element={loadLayout(AdminLayout, AdminCompanies)}
              />
            </>
          )}
        </>
      )}
      <Route path="*" element={<NotFound />} />{" "}
    </Routes>
  );
}
