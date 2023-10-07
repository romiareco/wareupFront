import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts";
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
  PublicationView,
  Searcher,
  UserBookingRequests,
  UserRegisterCompany,
} from "../pages";
import {
  ManageUsers,
  ManageDepositRequests,
  ManageDeposits,
  ManageBookingRequests,
} from "../pages/admin";
import {
  Login,
  RegisterUser,
  ForgotPassword,
  PasswordRecovery,
} from "../components/Forms";
import { NotFound } from "../components";
import { useAuth } from "../hooks";
import { role } from "../utils";

export function WebRouter() {
  const { user } = useAuth();

  const isAdmin = parseInt(user?.role) === role.ADMIN;

  const loadLayout = (Page) => (
    <MainLayout isAdmin={isAdmin}>
      <Page />
    </MainLayout>
  );

  const renderRoutes = (routes, isAdmin) => (
    <>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`/${isAdmin ? "admin/" : "users/"}${route.path}`}
          element={loadLayout(route.component)}
        />
      ))}
    </>
  );

  const userRoutes = [
    { path: "profile", component: UserProfile },
    { path: "my-deposits", component: UserDeposits },
    { path: "request-deposit", component: UserRequestDeposit },
    { path: "my-companies", component: UserCompanies },
    { path: "my-companies/register", component: UserRegisterCompany },
    { path: "my-deposit-requests", component: UserListRequestDeposits },
    { path: "publication-view", component: PublicationView },
    { path: "search-deposits", component: Searcher },
    { path: "booking-requests", component: UserBookingRequests },
  ];

  const adminRoutes = [
    { path: "home", component: AdminHome },
    { path: "manage-users", component: ManageUsers },
    { path: "manage-deposits", component: ManageDeposits },
    { path: "manage-deposits-requests", component: ManageDepositRequests },
    { path: "manage-booking-requests", component: ManageBookingRequests },
    { path: "register-deposit", component: RegisterDeposits },
    { path: "publication-view", component: PublicationView },
    { path: "search-deposits", component: Searcher },
  ];

  return (
    <Routes>
      <Route path="/contacts" element={<Contact />} />
      <Route path="/publication-view" element={<PublicationView />} />
      <Route path="/search-deposits" element={<Searcher />} />
      <Route path="/" element={<Welcome />} />
      {!user ? (
        <>
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
