import Home from "../pages/Home";
const privateRoutes = [
  {
    path: "/",
    component: Home,
    layout: 'LayoutMain',
  }
];

const pubicRoutes = [];

export { privateRoutes, pubicRoutes };
