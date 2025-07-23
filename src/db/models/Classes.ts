import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class Classes extends Model<InferAttributes<Classes>, InferCreationAttributes<Classes>> {
    declare id: CreationOptional<number>;
    declare Schedule_Date: Date;
    declare Type: string;
    declare Status: CreationOptional<string>;
    declare Center_Id: number;
    declare EndDate: Date;
    declare slot: number;
};

Classes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Schedule_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "UPCOMING"
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Center_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    slot: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Classes",
    sequelize: sequelize,
    timestamps: true,
    createdAt: 'Created_At',
    updatedAt: 'Updated_At',

});

export default Classes;