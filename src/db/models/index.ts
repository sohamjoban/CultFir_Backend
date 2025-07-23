import Classes from "./Classes";
import Center from "./Center";
import User from "./User";
import Booking from "./Booking";

// Set up associations here

// Association Between Classes And Center

export function CreateConnectionBetweenClassAndCenter() {
    Classes.belongsTo(Center, {
        foreignKey: "Center_Id",
    });

    Center.hasMany(Classes, {
        foreignKey: "Center_Id",
    });
};

// Association Between User And Booking

export function CreateConnectionBetweenUserAndBooking() {

    User.hasMany(Booking, {
        foreignKey: "User_Id"
    });

    Booking.belongsTo(User, {
        foreignKey: "User_Id"
    });
};





