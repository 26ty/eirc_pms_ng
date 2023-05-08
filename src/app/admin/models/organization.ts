export interface Position {
  ID: string;
  department: string;
  position: string;
  review_level: number;
}
export interface Department {
  ID: string;
  department: string;
  is_children: boolean;
  upper_department: string;
}
export interface CreateDepartment {
  department: string;
  is_children: boolean;
  upper_department: string;
}
export interface CreatePosition {
  department: string;
  position: string;
  review_level: number;
}
export interface EditDepartment {
  department: string;
  is_children: number;
  upper_department: string;
}
export interface EditPosition {
  department: string;
  position: string;
  review_level: number;
}

export interface Departments {
  department: string;
}

export interface Positions {
  position: string;
  review_level: number;
}
export interface ProxyPositions {
  proxy_position: string;
  proxy_reviewlevel: number;
}
