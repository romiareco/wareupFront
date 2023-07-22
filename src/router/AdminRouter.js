import React from 'react'
import {Routes, Route} from "react-router-dom";
import {Auth, Storages} from "../pages";
import { AuthLayout } from "../layouts";


/**
 * TODO:
 * Llamar al backend para que devuelva todos los users backoffice y verificar si el usuario loggeado tiene acceso a estas rutas.
 */
export function AdminRouter() {
    const loadLayout = (Layout, Page) => {
        return (
          <Layout>
            <Page />
          </Layout>
        );
      };

    return (
        <Routes>
            <Route path="/admin/home" element={loadLayout(AuthLayout, Auth)} />
            <Route path="/admin/storages" element={loadLayout(AuthLayout, Storages)} />
        </Routes>
    );
}