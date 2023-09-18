import React from "react";
import PageContainer from "../src/components/container/PageContainer";
import { Box, Grid } from "@mui/material";
import TopCards from "../src/components/dashboards/modern/TopCards";
import RevenueUpdates from "../src/components/dashboards/ecommerce/RevenueUpdates";
import YearlyBreakup from "../src/components/dashboards/modern/YearlyBreakup";
import MonthlyEarnings from "../src/components/dashboards/ecommerce/MonthlyEarnings";
import EmployeeSalary from "../src/components/dashboards/modern/EmployeeSalary";
import Customers from "../src/components/dashboards/modern/Customers";
import Projects from "../src/components/dashboards/modern/Projects";
import Social from "../src/components/dashboards/modern/Social";
import SellingProducts from "../src/components/dashboards/modern/SellingProducts";
import Welcome from "../src/layouts/full/shared/welcome/Welcome";
import TopPerformers from "../src/components/dashboards/modern/TopPerformers";
import WeeklyStats from "../src/components/dashboards/modern/WeeklyStats";
import FormWizard from "./forms/form-wizard";

const Landingpage = () => {
  return (
    <PageContainer>
      <Box>
        <FormWizard />
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

// Landingpage.layout = "Blank";
export default Landingpage;
