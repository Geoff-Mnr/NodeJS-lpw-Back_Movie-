import { Request, Response } from 'express';
import { prisma } from "../app";


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
        console.log("Route update atteinte");
        const { title, sinopsis, year, director } = req.body;
        console.log("Données reçues :", { title, sinopsis, year, director });

        const id = +req.params.id;
        console.log("ID à mettre à jour :", id);
        try {
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
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            return res.status(500).json({ error: "Erreur lors de la mise à jour de la base de données." });
        }

    }

    async remove(req: Request, res: Response) {

        try {
            const id = +req.params.id;
            const result = await prisma.movie.delete({
                where: {
                    id: id
                }
            });
            return res.json({ result: result });
        }
        catch (e) {
            return res.status(500).json({ status: 'error', data: 'error' });
        }
    }

    async list(req: Request, res: Response) {
        const movies = await prisma.movie.findMany({});
        return res.json({ data: movies });
    }

}