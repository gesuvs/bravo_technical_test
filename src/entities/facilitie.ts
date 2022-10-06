import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../database/connection";

interface FacilitieAttributes {
  id: number;
  name: string;
}

export class Facilitie extends Model<FacilitieAttributes> {
  public id!: number;
  public name!: string  
}

Facilitie.init({
  id: {
    field: 'facility_id',
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    field: 'facility_name',
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    tableName: 'facilities',
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelizeConnection
  }
)