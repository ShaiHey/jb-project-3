import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import { createHmac } from "crypto";
import config from "config";
import { sign } from "jsonwebtoken";
import AppError from "../../errors/app-error";
import status from "http-status";
import Like from "../../models/like";

export function hashPassword(password: string): string {
    return createHmac('sha256', config.get<string>('app.secret'))
        .update(password)
        .digest('hex')
}

export async function login(req: Request<{}, {}, {
    email: string,
    password: string
}>, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email,
                password: hashPassword(password)
            },
            include: [ Like ]
        })

        if(!user) return next(new AppError(
            status.INTERNAL_SERVER_ERROR,
           'Wrong credentials'
        ))

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'))

        res.json({ jwt })
    } catch (error) {
        next(error)
    }
}

export async function signUp(req: Request<{}, {}, {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}>, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body
    try {

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword(password)
        })

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'))

        res.json({ jwt })
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError") return next(new AppError(
            status.CONFLICT,
            `User with this email ${email} already exists. Please choose another email`
        ))
        next(error)
    }
}