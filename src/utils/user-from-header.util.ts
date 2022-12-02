import { Request } from "express";
import { verify } from "jsonwebtoken";

export function getUserIdFromRequest(req: Request) : string {
    let idFromToken = null;
    const reqHeader = req?.headers?.authorization || "";
    const token = reqHeader.replace('Bearer ', '');
    try {
        verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, token) => {
            if(err) {
                console.log(err)
            } else {
                idFromToken = token
            }
        })
        return idFromToken.id;
    } catch(e) {
        return "";
    }
}