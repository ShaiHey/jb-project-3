import { NextFunction, Request, Response } from "express";
import Like from "../../models/like";
import status from "http-status";
import AppError from "../../errors/app-error";
import User from "../../models/user";
import socket from "../../io/io";
import SocketMessages from "socket-enums-vacations-shaihey";

export async function getLikes(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId

        const user = await User.findByPk(userId, {
            include: [ Like ]
        })

        res.json(user.vacationLikes)
    } catch (error) {
        next(error)
    }
}

export async function addLike(req: Request<{vacationId: string}>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params

        const newLike = await Like.create({
            likerId: req.userId,
            vacationId
        })

        res.json(newLike)

        socket.emit(SocketMessages.NEW_LIKE, {
            from: req.headers['x-client-id'],
            data: newLike
        })
    } catch (error) {
        next(error)
    }
}

export async function removeLike(req: Request<{vacationId: string}>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params

        const isDeleted = await Like.destroy({
            where: {
                likerId: req.userId,
                vacationId
            }
        })

        if(isDeleted === 0) return next(new AppError(
            status.NOT_FOUND,
            "Tried to delete unexciting record"
        ));

        res.json({ success: true });

        socket.emit(SocketMessages.REMOVE_LIKE, {
            from: req.headers['x-client-id'],
            data: { vacationId, likerId: req.userId }
        })
    } catch (error) {
        next(error)
    }
}