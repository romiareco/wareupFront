import React from 'react'
import {Routes, Route} from "react-router-dom";
import {Auth, Storages} from "../pages";
import { AdminLayout } from "../layouts";


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
            <Route path="/admin/home" element={loadLayout(AdminLayout, Auth)} />
            <Route path="/admin/storages" element={loadLayout(AdminLayout, Storages)} />
        </Routes>
    );
}