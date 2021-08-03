import React from "react";
import SideBar from "components/Sidebar";

import styled from "styled-components";
const AppShellWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AppShell: React.FC = ({ children }: any) => {
  return (
    <AppShellWrapper>
      <SideBar />
      {children}
    </AppShellWrapper>
  );
};
export default AppShell;
