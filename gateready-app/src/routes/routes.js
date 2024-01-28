import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import Spinner from "./../Layout/Spinner";
import { Navigate } from "react-router-dom";
import BottomNavbar from '../components/BottomNavbar.js';
import TopNavbar from "../components/TopNavbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const PlanRoute = lazy(() => import("../pages/PlanRoute"));
const Home = lazy(() => import("../pages/Home"));
const TimelinePage = lazy(() => import("../pages/TimelinePage"));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A95FF', // Your primary color
    },
    typography: {
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    // ... other theme properties if needed
  },
});

const RoutePaths = () => {
  return (
    <ThemeProvider theme={theme}>
     
      <BrowserRouter>
       <TopNavbar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/gate-ready/" />}></Route>
            <Route path="/gate-ready/" element={<Home />}></Route>
            <Route path="/gate-ready/timeline" element={<TimelinePage />}></Route>
            <Route path="/gate-ready/planroute" element={<PlanRoute />}></Route>
          </Routes>
        </Suspense>
        <BottomNavbar />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default RoutePaths;