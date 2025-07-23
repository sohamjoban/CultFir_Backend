import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {

    declare id: CreationOptional<number>;
    declare Classes_Id: number;
    declare User_Id: number;
    declare Status: CreationOptional<string>;
    declare Deleted_At: CreationOptional<Date | null>;
    declare Date: Date;
    declare classDate: Date;
};

Booking.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Classes_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    User_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Conform"
    },

    Deleted_At: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    Date: {
        type: DataTypes.DATE
    },
    classDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "Booking",
    sequelize: sequelize,
    timestamps: true,
    createdAt: 'Created_At',
    updatedAt: 'Updated_At',
});

export default Booking;