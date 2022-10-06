import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../database/connection";

interface ClinicanWorkHistoryAttributes {
  id: number;
  facilityId: number;
  nurseId: number;
  workedShift: boolean;
  callOut: boolean;
  noCallNoShow: boolean;
}

export class ClinicanWorkHistory extends Model<ClinicanWorkHistoryAttributes> {
  public id!: number;
  public facilityId!: number;
  public nurseId!: number;
  public workedShift!: boolean;
  public callOut!: boolean;
  public noCallNoShow!: boolean;
}

ClinicanWorkHistory.init({
  id: {
    field: 'work_history_id',
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  facilityId: {
    field: 'facility_id',
    type: DataTypes.STRING,
    allowNull: false
  },
  nurseId: {
    field: 'nurse_id',
    type: DataTypes.STRING,
    allowNull: false
  },
  workedShift: {
    field: 'worked_shift',
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  callOut: {
    field: 'call_out',
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  noCallNoShow: {
    field: 'no_call_no_show',
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
},
  {
    tableName: 'clinician_work_history',
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelizeConnection
  }
)