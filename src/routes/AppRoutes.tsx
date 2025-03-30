
import React from "react";
import { Routes } from "react-router-dom";

// Import route groups
import { publicRoutes } from "./publicRoutes";
import {
  mainRoutes,
  operationalRoutes,
  taxCreditRoutes,
  securityRoutes,
  settingsRoutes,
  profileRoutes,
  placeholderRoutes,
} from "./protectedRoutes";

/**
 * AppRoutes component that combines all route groups
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes}

      {/* Protected Main Routes */}
      {mainRoutes}

      {/* Operational Routes */}
      {operationalRoutes}

      {/* Tax Credits Routes */}
      {taxCreditRoutes}

      {/* Security & Audit Routes */}
      {securityRoutes}

      {/* Profile Routes */}
      {profileRoutes}

      {/* Settings Routes */}
      {settingsRoutes}

      {/* Placeholder Routes */}
      {placeholderRoutes}
    </Routes>
  );
};

export default AppRoutes;
