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

export interface DivisionInList {
    accompanying_name: string;
    comment: string;
    id: number;
    is_removed: boolean;
    name: string;
    node_type: string;
    parent_id: number;
    root_id: number;
    staff_access_template_name: string;
    tel: string;
    visitor_access_template_name: string;
    work_schedule_name: string;
}

export interface DivisionTree {
    children: DivisionTree[];
    accompanying_name: string;
    comment: string;
    id: number;
    is_removed: boolean;
    name: string;
    node_type: string;
    parent_id: number;
    root_id: number;
    staff_access_template_name: string;
    tel: string;
    visitor_access_template_name: string;
    work_schedule_name: string;
}
