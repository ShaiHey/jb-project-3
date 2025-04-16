import { AllowNull, BelongsToMany, Column, DataType, Default, HasMany, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import Vacation from "./vacation";
import Like from "./like";

@Table({
    underscored: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    firstName: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    lastName: string;

    @Index({ unique: true })
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING(64))
    password: string;

    @Default("user")
    @Column(DataType.ENUM('user', 'admin'))
    role: string;

    @HasMany(() => Like)
    vacationLikes: Like[];
}