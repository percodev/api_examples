export interface DeviceCommand {
    title?:string;
    cmdNumber:number;
    cmdType:number;
    cmdValue:number;
    cmdParam:number;
}

export interface DeviceCommandBlock {
    title:string;
    commands:DeviceCommand[];
}