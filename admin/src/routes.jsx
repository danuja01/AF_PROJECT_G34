import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  GlobeAmericasIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Tours from "./pages/dashboard/Tours";
import Items from "./pages/dashboard/Items";
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
        icon: <GlobeAmericasIcon {...icon} />,
        name: "Hotels and Restaurants",
        path: "/items",
        element: <Items />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Booking Requests",
        path: "/bookings",
        element: <Bookings />,
      },
      {
        icon: <ChatBubbleBottomCenterTextIcon {...icon} />,
        name: "Reviews",
        path: "/reviews",
        element: <Bookings />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Blogs",
        path: "/blogs",
        element: <Bookings />,
      },

      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
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
