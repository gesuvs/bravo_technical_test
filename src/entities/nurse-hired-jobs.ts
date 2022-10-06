import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../database/connection";
import { Job } from "./job";
import { Nurse } from "./nurse";

interface NurseHiredJobsAttributes {
  jobId: number;
  nurseId: number;
}

export class NurseHiredJobs extends Model<NurseHiredJobsAttributes> {
  public jobId!: number;
  public nurseId!: number;


}

NurseHiredJobs.init({
  jobId: {
    field: 'job_id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      key: "job_id",
      model: Job
    }
  },
  nurseId: {
    field: 'nurse_id',
    type: DataTypes.INTEGER,
    references: {
      key: "nurse_id",
      model: Nurse
    }
  },
},
  {
    tableName: 'nurse_hired_jobs',
    freezeTableName: true,
    timestamps: false,    
    sequelize: sequelizeConnection
  }
)