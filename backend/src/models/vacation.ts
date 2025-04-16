import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Like from "./like";

@Table({
    underscored: true
})
export default class Vacation extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    endDate: Date;

    @AllowNull(false)
    @Column(DataType.DECIMAL(12, 2))
    price: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    imageUrl: string;

    @HasMany(() => Like)
    likes: Like[];
}