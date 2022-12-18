import userRoutes from "./users";
import parkingSpotRoutes from "./parking-spot";
import roleRoutes from "./role";
import reservationRoutes from "./reservation";
import authRoutes from "./auth";
import walletRoutes from "./wallet";


export default class AppRoutes {
  public routers = [
    authRoutes,
    userRoutes,
    parkingSpotRoutes,
    roleRoutes,
    reservationRoutes,
    walletRoutes
  ]
}
