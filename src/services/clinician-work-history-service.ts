import { QueryTypes } from "sequelize";
import { ClinicanWorkHistory } from "../entities/clinician-work-history";

interface PriorityScore {
  facility_id: number,
  nurse_id: number,
  priority_score: number
}

export const getPrioritiesNursesByFacilitie = async (facilitieId: string): Promise<PriorityScore[]> => {
  const response = await ClinicanWorkHistory.sequelize?.query<PriorityScore>({
    query: "SELECT * FROM priority_score(?) as ps ORDER BY ps.priority_score DESC, ps.nurse_id DESC;",
    values: [facilitieId]
  }, {
    type: QueryTypes.SELECT
  }) as PriorityScore[];
  return response
}