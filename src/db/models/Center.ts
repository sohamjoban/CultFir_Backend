import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class Center extends Model<InferAttributes<Center>, InferCreationAttributes<Center>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare Deleted_At: CreationOptional<Date | null>;
};

Center.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Deleted_At: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: "Center",
    sequelize: sequelize,
    timestamps: true,
    createdAt: 'Created_At',
    updatedAt: 'Updated_At',
});

export default Center;