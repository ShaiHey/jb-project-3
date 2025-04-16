import { Sequelize } from "sequelize-typescript";
import config from "config";
import User from "../models/user";
import Vacation from "../models/vacation";
import Like from "../models/like";

const logging = config.get<boolean>('sequelize.logging');

const sequelize = new Sequelize({
    models: [ User, Vacation, Like ],
    logging: logging ? console.log : false,
    ...config.get('db')
})

export default sequelize;