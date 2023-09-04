import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout, AdminLayout } from "../layouts";
import {
  Welcome,
  UserProfile,
  UserDeposits,
  UserRequestDeposit,
  Contact,
  UserCompanies,
  UserHome,
  AdminHome,
  RegisterDeposits,
  UserListRequestDeposits,
  PublicationView
} from "../pages";
import { ManageUsers, ManageRequests, ManageDeposits } from "../pages/admin";
import {
  Login,
  RegisterUser,
  ForgotPassword,
  RegisterCompany,
  PasswordRecovery,
} from "../components/Forms";
import { NotFound } from "../components";
import { useAuth } from "../hooks";
import { role } from "../utils";

export function WebRouter() {
  const { user } = useAuth();

  const isAdmin = parseInt(user?.role) === role.ADMIN;

  const loadLayout = (Layout, Page) => (
    <Layout>
      <Page />
    </Layout>
  );

  const renderRoutes = (routes, isAdmin) => (
    <>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`/${isAdmin ? "admin/" : "users/"}${route.path}`}
          element={loadLayout(
            isAdmin ? AdminLayout : UserLayout,
            route.component
          )}
        />
      ))}
    </>
  );

  const userRoutes = [
    { path: "home", component: UserHome },
    { path: "profile", component: UserProfile },
    { path: "my-deposits", component: UserDeposits },
    { path: "request-deposit", component: UserRequestDeposit },
    { path: "my-companies", component: UserCompanies },
    { path: "my-companies/register", component: RegisterCompany },
    {path: "my-deposit-requests", component: UserListRequestDeposits},
  ];

  const adminRoutes = [
    { path: "home", component: AdminHome },
    { path: "manage-users", component: ManageUsers },
    { path: "manage-deposits", component: ManageDeposits },
    { path: "manage-requests", component: ManageRequests },
    { path: "register-deposit", component: RegisterDeposits },
  ];

  return (
    <Routes>
      <Route path="/contacts" element={<Contact />} />
      <Route path="/publication-view" element={<PublicationView />} />
      {!user ? (
        <>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/forgot-password" element={<ForgotPassword />} />
          <Route path="/users/404" element={<NotFound />} />
          <Route
            path="/users/password-recovery"
            element={<PasswordRecovery />}
          />
        </>
      ) : (
        <>
          {renderRoutes(userRoutes, false)}
          {isAdmin && renderRoutes(adminRoutes, true)}
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
