import { NextFunction, Request, Response } from "express";
import status from "http-status";
import AppError from "../../errors/app-error";
import Like from "../../models/like";
import Vacation from "../../models/vacation";
import SocketMessages from "socket-enums-vacations-shaihey";
import socket from "../../io/io";

export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [ Like ],
            order: [
                ['start_date', 'ASC']
            ]
        })

        res.json(vacations)
    } catch (error) {
        next(error)
    }
}

export async function getAllVacationsCSV(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [ Like ]
        });

        const header = "Destination,Likes";
        const toCSV = vacations.reduce((acc, current) => {
            const destination = current.destination.replace(/,/g, '');
            const likesCount = current.likes.length;
            return `${acc}\n"${destination}",${likesCount}`;
        }, header);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="vacations.csv"');

        res.send(toCSV)
    } catch (error) {
        next(error)
    }
}

export async function getVacation(req: Request<{vacationId: string}>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params
        const vacation = await Vacation.findByPk(vacationId, {
            include: [ Like ]
        });

        res.json(vacation)
    } catch (error) {
        next(error)
    }
}

export async function createVacation(req: Request<{}, {}, {
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number
}>, res: Response, next: NextFunction) {
    try {
        const newVacation = await Vacation.create({
            ...req.body,
            imageUrl: req.imageUrl
        })

        // in real new vacation don't have like
        await newVacation.reload({
            include: [ Like ]
        })

        res.json(newVacation)

        socket.emit(SocketMessages.ADD_VACATION, {
            from: req.headers['x-client-id'],
            data: newVacation
        })
    } catch (error) {
        next(error)
    }
}


export async function updateVacation(
    req: Request<{ vacationId: string }, {}, {
        destination: string;
        description: string;
        startDate: Date;
        endDate: Date;
        price: number;
    }>,
    res: Response,
    next: NextFunction
) {
    try {
        const { vacationId } = req.params;
        const { destination, description, startDate, endDate, price } = req.body;

        const vacation = await Vacation.findByPk(vacationId);

        if (!vacation) {
            return next(new AppError(
                status.NOT_FOUND,
                "Vacation not found"
            ))
        }

        if(req.imageUrl) {
            const imageUrl = req.imageUrl
            vacation.imageUrl = imageUrl
        }

        vacation.destination = destination;
        vacation.description = description;
        vacation.startDate = startDate;
        vacation.endDate = endDate;
        vacation.price = price;

        await vacation.save();

        await vacation.reload({
            include: [ Like ]
        })

        res.json(vacation);

        socket.emit(SocketMessages.UPDATE_VACATION, {
            from: req.headers['x-client-id'],
            data: vacation
        })
    } catch (error) {
        next(error);
    }
}

export async function deleteVacation(req: Request<{vacationId: string}>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params

        const vacation = await Vacation.destroy({
            where: {
                id: vacationId
            }
        })

        res.json({
            success: true
        })

        socket.emit(SocketMessages.REMOVE_VACATION, {
            from: req.headers['x-client-id'],
            data: { id: vacationId }
        })
    } catch (error) {
        next(error)
    }
}