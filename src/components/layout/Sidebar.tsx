
import React from 'react';
import Sidebar from './sidebar/Sidebar';

interface SidebarWrapperProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

// This component serves as the entry point to maintain the same interface
const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ collapsed, toggleCollapse }) => {
  return <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />;
};

export default SidebarWrapper;
