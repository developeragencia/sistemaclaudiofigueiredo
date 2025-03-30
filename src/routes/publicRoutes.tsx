
import React from "react";
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import PasswordResetPage from "@/pages/PasswordResetPage";
import { TwoFactorAuth } from "@/components/auth/TwoFactorAuth";
import NotFound from "@/pages/NotFound";

/**
 * Public routes that don't require authentication
 */
export const publicRoutes = [
  <Route path="/" element={<Index />} />,
  <Route path="/login" element={<Login />} />,
  <Route path="/reset-password" element={<PasswordResetPage />} />,
  <Route path="/2fa" element={<TwoFactorAuth />} />,
  <Route path="*" element={<NotFound />} />,
];

