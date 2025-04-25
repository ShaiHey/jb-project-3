import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user";
import Vacation from "./vacation";

@Table({
    underscored: true
})
export default class Like extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    likerId: string;

    @PrimaryKey
    @ForeignKey(() => Vacation)
    @Column(DataType.UUID)
    vacationId: string;
}