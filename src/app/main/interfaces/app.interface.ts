// Generated by https://quicktype.io

export interface App {
    id:           string;
    name:         string;
    stageRequest: StageRequest[];
    stage:        Stage[];
    startDate:    string;
    end:          string;
    tecnology:    Tecnology[];
    customer:     Customer[];
    hu:           Hu[];
}

export interface Customer {
    id?:    string;
    name:  string;
    email?: string;
    phone: number;
}

export interface Module {
    id:   number;
    description: string;
}

export interface Hu {
    id:          string;
    description: string;
    status:      Stage[];
    module: Module[];
}

export interface StageRequest {
    id:          number;
    description: string;
}

export interface Stage {
    id:          number;
    description: string;
}

export interface Tecnology {
    id:          number;
    description: string;
}

export interface AppSelect {
    id:          number;
    name: string;
}

export interface HuSelect {
    id:          string;
    description: string;
}

export interface ModuleSelect {
    id:          string;
    description: string;
}

export interface Requests{
    id?: number;
    nameCustomer:  string,
    emialCustomer: string,
    proyectName: string,
    phone: number,
    date?: Date,
    state: StageRequest[]
}

export interface Support{
    id: number;
    proyectName:  string,
    hu: HuSelect[],
    module: ModuleSelect[],
    date?: Date,
    stageRequest: StageRequest[];
    detail: string;
}

