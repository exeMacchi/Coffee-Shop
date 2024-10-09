import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProductModel = db.define("Product", {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ""
    },
    description: { 
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: ""
    },
    price: { 
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
    image: { 
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ""
    },
}, {
    tableName: "products",
    timestamps: true
});

export default ProductModel;
