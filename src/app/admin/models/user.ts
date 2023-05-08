
export interface UserItem {
  ID: string;
  username: string;
  password: string;
  name: string;
  role: string;
  user_id: string;
  department: string;
  position: string;
  review_level: number;
  proxy_department: string;
  proxy_position: string;
  proxy_reviewlevel: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}

export interface Users {
  username: string;
  password: string;
  name: string;
  role: string;
  user_id: string;
  department: string;
  position: string;
  review_level: number;
  proxy_department: string;
  proxy_position: string;
  proxy_reviewlevel: number;
}

export interface EditUser {
  name: string;
  role: string;
  user_id: string;
  department: string;
  position: string;
  review_level: number;
  proxy_department: string;
  proxy_position: string;
  proxy_reviewlevel: number;
}
