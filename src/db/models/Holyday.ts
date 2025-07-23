import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class HolyDay extends Model<InferAttributes<HolyDay>, InferCreationAttributes<HolyDay>> {

    declare id: CreationOptional<number>;
    declare userId: number;
    declare CenterId: number;
    declare Date: Date;
    declare Deleted_At: CreationOptional<Date | null>;
};

HolyDay.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    CenterId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Deleted_At: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: "HolyDay",
    sequelize: sequelize,
    timestamps: true,
    createdAt: 'Created_At',
    updatedAt: 'Updated_At',
});

export default HolyDay;