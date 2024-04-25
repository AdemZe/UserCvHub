import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use( req: Request , res: Response , next: () => void  ) {
    //console.log(req);
    console.log(" je suis le first middlware ");
    //console.log(res);
    next();
  }
}
