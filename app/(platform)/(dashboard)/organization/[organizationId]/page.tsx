import { auth } from "@clerk/nextjs";
import React from "react";

const OrganizationIdPage = () => {
  const { user, orgId, userId } = auth();
  return <div>OrganizationIdPage</div>;
};

export default OrganizationIdPage;
