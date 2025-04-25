import express, { json } from "express";
import cors from "cors";
import config from "config";
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import bearerToken from "express-bearer-token";
import authJwt from "./middlewares/auth/getUser";
import verifyUser from "./middlewares/auth/verifyUser";
import logRequest from "./middlewares/log-request";
import fileUpload from "express-fileupload";
import authRouter from "./routers/auth";
import vacationsRouter from "./routers/vacations";
import likesRouter from "./routers/likes";
import { createAppBucketIfNotExist } from "./aws/aws";

const force = config.get<boolean>('sequelize.sync.force');

export const server = express();

export async function start() {
    await sequelize.sync({ force });

    await createAppBucketIfNotExist();

    // Middlewares
    server.use(cors());
    server.use(json());
    server.use(fileUpload());

    server.use(logRequest)

    server.use('/auth', authRouter)
    server.use(bearerToken());
    server.use(authJwt, verifyUser)
    
    // [ Here is the place to mount routers on the app ]
    server.use('/vacations', vacationsRouter)
    server.use('/likes', likesRouter)

    // Special notFound middleware
    server.use(notFound);

    // Error middleware
    server.use(errorLogger)
    server.use(errorResponder)
}