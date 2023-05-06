import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  GlobeAmericasIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Tours from "./pages/dashboard/Tours";
import Bookings from "./pages/dashboard/bookings";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <GlobeAmericasIcon {...icon} />,
        name: "Tours",
        path: "/tours",
        element: <Tours />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Booking Requests",
        path: "/bookings",
        element: <Bookings />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
    ],
  },
  {
    title: "authentication",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Create new account",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
