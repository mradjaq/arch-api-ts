import userRoutes from "./users";
import parkingSpotRoutes from "./parking-spot";
import roleRoutes from "./role";
import reservationRoutes from "./reservation";


export default class AppRoutes {
  public routers = [
    userRoutes,
    parkingSpotRoutes,
    roleRoutes,
    reservationRoutes
  ]
}
