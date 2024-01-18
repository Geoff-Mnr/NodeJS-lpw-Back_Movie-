import { Request, Response } from 'express';
import { prisma } from "../app";
import { json } from "stream/consumers";

export class MovieController {

    async create(req: Request, res: Response) {
        const { title, sinopsis, year, director } = req.body;
        const movie = await prisma.movie.create({
            data: {
                title,
                sinopsis,
                year,
                director
            }
        });
        return res.json(movie);

    }

    async update(req: Request, res: Response) {
        const { title, sinopsis, year, director } = req.body;
        const id = +req.params.id;
        const movie = await prisma.movie.update({
            where: {
                id: id
            },
            data: {
                title,
                sinopsis,
                year,
                director
            }
        });
        return res.json(movie);
    }

    async remove(req: Request, res: Response) {

        try {
            const id = +req.params.id;
            const result = await prisma.movie.delete({
                where: {
                    id: id
                }
            });
            return res.json({result: result});
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: 'error'});
        }
    }

    async list(req: Request, res: Response) {
        const movies = await prisma.movie.findMany({});
        return res.json({data: movies});
    }

}