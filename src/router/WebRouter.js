import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
  UserProfile,
  UserDeposits,
  UserRequestDeposit,
  Contact,
  UserCompanies,
  Home,
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
  Metrics,
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
  const isLoggedIn = user !== null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout isAdmin={isAdmin} isLoggedIn={isLoggedIn}>
            <Outlet />
          </MainLayout>
        }
      >
        {/* Rutas públicas */}
        <Route index element={<Home />} />
        <Route path="contacts" element={<Contact />} />
        <Route path="publication-view" element={<PublicationView />} />
        <Route path="search-deposits" element={<Searcher />} />

        {/* Rutas de autenticación */}
        {!isLoggedIn && (
          <>
            <Route path="register" element={<RegisterUser />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
          </>
        )}

        {/* Rutas de usuario y admin */}
        {isLoggedIn && (
          <>
            <Route path="profile" element={<UserProfile />} />
            <Route path="my-deposits" element={<UserDeposits />} />
            <Route path="request-deposit" element={<UserRequestDeposit />} />
            <Route path="my-companies" element={<UserCompanies />} />
            <Route
              path="my-companies/register"
              element={<UserRegisterCompany />}
            />
            <Route
              path="my-deposit-requests"
              element={<UserListRequestDeposits />}
            />
            <Route path="booking-requests" element={<UserBookingRequests />} />
          </>
        )}

        {/* Rutas de admin */}
        {isAdmin && (
          <>
            <Route path="admin/manage-users" element={<ManageUsers />} />
            <Route path="admin/manage-deposits" element={<ManageDeposits />} />
            <Route
              path="admin/manage-deposits-requests"
              element={<ManageDepositRequests />}
            />
            <Route
              path="admin/manage-booking-requests"
              element={<ManageBookingRequests />}
            />
            <Route
              path="admin/register-deposit"
              element={<RegisterDeposits />}
            />
            <Route
              path="admin/publication-view"
              element={<PublicationView />}
            />
            <Route
              path="admin/metrics"
              element={<Metrics />}
            />
          </>
        )}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
