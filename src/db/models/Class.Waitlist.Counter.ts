// import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
// import sequelize from "./sequelize";

// class Class_Waitlist_Counter extends Model<InferAttributes<Class_Waitlist_Counter>, InferCreationAttributes<Class_Waitlist_Counter>> {
//     declare classId: number;
//     declare waitlist_added: number;
//     declare waitlist_removed: number;
//     declare DeletedAt: CreationOptional<Date | null>;
//     declare UpdatedAt: CreationOptional<Date | null>;
// };

// Class_Waitlist_Counter.init({
//     classId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     waitlist_added: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     waitlist_removed: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     UpdatedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null
//     },
//     DeletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null
//     }
// }, {
//     tableName: "Class_Waitlist_Counter",
//     sequelize: sequelize,
//     timestamps: true,
//     createdAt :false,
//     updatedAt : "UpdatedAt"
// });

// Class_Waitlist_Counter.removeAttribute("id");

// export default Class_Waitlist_Counter;
