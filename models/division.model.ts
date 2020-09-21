import { NamedId } from "./staff.model";
export interface Division {
	accompanying: NamedId;
	comment: string;
	id: number;
	is_removed: boolean;
	name: string;
	node_type: string;
	parent_id: number;
	root_id: number;
	staff_access_template: NamedId;
	tel: string;
	visitor_access_template: NamedId;
	work_schedule: NamedId;
}
