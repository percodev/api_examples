export interface Staff {
	id: number;
	last_name: string;
	first_name: string;
	middle_name: string;
	tabel_number: string;
	hiring_date: string;
	is_active: number;
	dismissed_date: string;
	begin_datetime: string;
	end_datetime: string;
	division: NamedId;
	position: NamedId;
	access_template: NamedId;
	work_schedule: NamedId;
	identifier: string;
	barcode: string;
	photo: string;
	additional_fields: {
		text: AdditionalStaffField[];
		image: any[];
	};
	user_type_id: number;
}

export interface AdditionalStaffField {
    id:number;
    name: string;
    type_id: number;
    text: string;
}

export interface NamedId {
    [id:string]:string;
}
