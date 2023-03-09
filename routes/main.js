import Router from "./routes.js";

const router = new Router();

router.add("/", "/pages/home.html");
router.add("/watchlist", "/pages/watchlist.html");
router.add(404, "/pages/404.html");

router.handle();

window.onpopstate = () => {
  router.handle();
};

window.route = () => {
  router.route();
};
