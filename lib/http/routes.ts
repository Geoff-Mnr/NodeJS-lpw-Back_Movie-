import { Request, Response, Express } from "express";
import { prisma } from "../app";
import { json } from "stream/consumers";
import { MovieController } from "../controllers/movie";

export class Routes {

    public static buildRoutes(app: Express) {

        app.route('/').get((req: Request, res: Response) => {
            res.json({ result: "success" })
        })

        app.route('/bonjour').get((req: Request, res: Response) => {
            res.json({ 'content': 'Hello world !' });
        })

        app.route('/test').get(async (req: Request, res: Response) => {
            const user = await prisma.user.create({
                data: {
                    name: 'Alicg',
                    email: 'alice@prisma.io',
                },
            });
            return res.json(user);
        })

        app.route('/movie').post(async (req: Request, res: Response) => {
            const controller = new MovieController();
            controller.create(req, res);
        });

        app.route('/movie/:id').delete(async (req: Request, res: Response) => {
            const controller = new MovieController();
            controller.remove(req, res);
        });

        app.route('/movie').get(async (req: Request, res: Response) => {
            const controller = new MovieController();
            controller.list(req, res);
        });

        app.route('/movie/:id').put(async (req: Request, res: Response) => {
            const controller = new MovieController();
            controller.update(req, res);
        });
    
}
}