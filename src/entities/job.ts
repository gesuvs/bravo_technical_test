import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../database/connection";

interface JobAttributes {
  id: number;
  facilityId: number;
  nurseTypeNeeded: string
  totalNursesNeeded: number;
}

export class Job extends Model<JobAttributes> {
  public id!: number;
  public facilityId!: number;
  public nurseTypeNeeded!: string;
  public totalNursesNeeded!: number;

  //job_id 200 total_number_nurses_needed = 1
  // table nurse_hired_jobs
  // job_id 200 contar e depois  subtratir com o total_number_nurses_needed


}

Job.init({
  id: {
    field: 'job_id',
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  facilityId: {
    field: 'facility_id',
    type: DataTypes.STRING,
    allowNull: false
  },
  nurseTypeNeeded: {
    field: 'nurse_type_needed',
    type: DataTypes.STRING,
    allowNull: false
  },
  totalNursesNeeded: {
    field: 'total_number_nurses_needed',
    type: DataTypes.NUMBER,
    allowNull: false
  },
},
  {
    tableName: 'jobs',
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelizeConnection
  }
)