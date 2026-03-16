import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Computers from "./pages/Computers";
import PackageService from "./pages/PackageService";
import Rentals from "./pages/Rentals";
import Reservation from "./pages/Reservation";
import Visitors from "./pages/Visitors";
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, COMPUTER_ROUTE, PACKAGESERVICE_ROUTE, RENTALS_ROUTE, RESERVATION_ROUTE, VISITOR_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: COMPUTER_ROUTE,
        Component: Computers
    },
    {
        path: PACKAGESERVICE_ROUTE,
        Component: PackageService
    },
    {
        path: RENTALS_ROUTE,
        Component: Rentals
    },
    {
        path: RESERVATION_ROUTE,
        Component: Reservation
    },
    {
        path: VISITOR_ROUTE,
        Component: Visitors
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]