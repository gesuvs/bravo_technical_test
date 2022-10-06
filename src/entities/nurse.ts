import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../database/connection";

interface NurseAttributes {
  id: number;
  name: string;
  nurseType: string
}

export class Nurse extends Model<NurseAttributes> {
  public id!: number;
  public name!: string;
  public nurseType!: string;

}

Nurse.init({
  id: {
    field: 'nurse_id',
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    field: 'nurse_name',
    type: DataTypes.STRING,
    allowNull: false
  },
  nurseType: {
    field: 'nurse_type',
    type: DataTypes.STRING,
    allowNull: false
  },
},
  {
    tableName: 'nurses',
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelizeConnection
  }
)