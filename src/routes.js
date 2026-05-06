import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Computers from "./pages/Computers";
import PackageService from "./pages/PackageService";
import Rentals from "./pages/Rentals";
import Reservation from "./pages/Reservation";
import Specifications from "./pages/Specifications";
import Visitors from "./pages/Visitors";
import ActiveRentals from "./pages/ActiveRentals";
import ChiefRegisterAdmin from "./pages/ChiefRegisterAdmin";
import { ACTIVE_RENTALS_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, CHIEF_REGISTER_ROUTE, COMPUTER_ROUTE, PACKAGESERVICE_ROUTE, RENTALS_ROUTE, RESERVATION_ROUTE, VISITOR_ROUTE, SPECIFICATION_ROUTE } from "./utils/consts";

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
        path: ACTIVE_RENTALS_ROUTE,
        Component: ActiveRentals
    },
    {
        path: RESERVATION_ROUTE,
        Component: Reservation
    },
    {
        path: VISITOR_ROUTE,
        Component: Visitors
    },
    {
        path: SPECIFICATION_ROUTE,
        Component: Specifications
    },
    {
        path: CHIEF_REGISTER_ROUTE,
        Component: ChiefRegisterAdmin
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]