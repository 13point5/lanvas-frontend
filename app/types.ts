export enum Role {
  assistant,
  human,
  system,
}

export type Message = {
  role: Role;
  id: string;
  content: string;
};

export enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

export type CourseMember = {
  id: number;
  email: string;
  created_at: string;
  course_id: number;
  role: string;
};

export type CourseMaterial = {
  id: number;
  course_id: number;
  created_at: string;
  file_name: string;
  status: string;
};

export type Course = {
  id: number;
  created_at: string;
  title: string;
  course_members: CourseMember[];
  course_materials: CourseMaterial[];
};
