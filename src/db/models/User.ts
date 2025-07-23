import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string | null;
    declare password: string;
    declare phone_number: string;
    declare strike_count: CreationOptional<number>;
    declare no_show_count: CreationOptional<number>;
    declare role: CreationOptional<string>;
    declare MaxBooking: CreationOptional<number>;
    declare Deleted_At: CreationOptional<Date | null>;
    declare banned_until: CreationOptional<Date | null>;
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    strike_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    no_show_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    MaxBooking: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Deleted_At: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    banned_until: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }


}, {
    tableName: "User",
    sequelize: sequelize,
    timestamps: true,
    createdAt: 'Created_At',
    updatedAt: 'Updated_At',

});

export default User;
