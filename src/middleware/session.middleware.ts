import { NextFunction, Request, Response } from "express";

export default class SessionVerification {
//   isLogin(req: Request, res: Response, next: NextFunction){
//     if(req.session.loggedin === true){
//         next();
//         return;
//     } else {
//         req.session.destroy(function(err) {
//             res.redirect('/login');
//         })
//     }
// },
// isLogout(req: Request, res: Response, next: NextFunction){
//     if(req.session.loggedin !== true){
//         next();
//         return;
//     }
//     res.redirect('/');
// }
}