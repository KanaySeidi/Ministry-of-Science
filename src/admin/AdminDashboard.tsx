import React from "react";
import { useTranslation } from "react-i18next";
import AdminDashboardTable from "./AdminDashboardTable";

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        {t("admin.dashboardTitle", "Панель администратора")}
      </h1>
      <AdminDashboardTable />
    </div>
  );
};

export default AdminDashboard;
