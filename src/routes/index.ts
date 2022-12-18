import userRoutes from "./users";
import parkingSpotRoutes from "./parking-spot";
import roleRoutes from "./role";
import reservationRoutes from "./reservation";
import authRoutes from "./auth";
import walletRoutes from "./wallet";
import paymentRoutes from "./payment";


export default class AppRoutes {
  public routers = [
    authRoutes,
    userRoutes,
    parkingSpotRoutes,
    roleRoutes,
    reservationRoutes,
    walletRoutes,
    paymentRoutes
  ]
}
