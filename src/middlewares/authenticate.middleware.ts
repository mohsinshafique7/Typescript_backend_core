import HttpException from "@/utils/exceptions/http.exception";
import { verifyToken } from "@/utils/token";
import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
async function authenticateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return next(new HttpException(401, "Unauthorised"));
    }
    const accessToken = bearer.split("Bearer: ")[1].trim();
    try {
        const payload: any | jwt.JsonWebTokenError = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, "Unauthorised"));
        }

        const user: any = { id: 1, name: "Mohsin" };
        if (!user) {
            return next(new HttpException(401, "Unauthorised"));
        }
        req.user = user;
        return next();
    } catch (error) {
        return next(new HttpException(401, "Unauthorised"));
    }
}
