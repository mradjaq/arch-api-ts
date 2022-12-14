import userRoutes from "./users";
import parkingSpotRoutes from "./parking-spot";
import roleRoutes from "./role";
import reservationRoutes from "./reservation";
import authRoutes from "./auth";


export default class AppRoutes {
  public routers = [
    authRoutes,
    userRoutes,
    parkingSpotRoutes,
    roleRoutes,
    reservationRoutes
  ]
}
