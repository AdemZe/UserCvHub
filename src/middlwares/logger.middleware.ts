import { Request, Response } from "express";

export const Logger=(req: Request  , res:Response , next   )=>{
    console.log( ` id = ${req.ip} ` ) ;
    next();




}