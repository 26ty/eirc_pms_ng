export interface Organization {
  ID: string;
  department: string;
  position: string;
  review_level: number;
}
export interface CreateOrganization {
  department: string;
  position: string;
  review_level: number;
}
export interface EditOrganization {
  department: string;
  position: string;
  review_level: number;
}
