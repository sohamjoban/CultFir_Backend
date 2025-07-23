import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class WaitList extends Model<InferAttributes<WaitList>, InferCreationAttributes<WaitList>> {
    declare id: CreationOptional<number>;
    declare classId: number;
    declare userId: number;
    declare DeletedAt: CreationOptional<Date | null>;
    declare UpdatedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date | null>;
};

WaitList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    DeletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }


}, {
    tableName: "WaitList",
    sequelize: sequelize,
    timestamps: true,
    updatedAt: "UpdatedAt",

});

export default WaitList;
