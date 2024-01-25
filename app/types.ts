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

export enum CourseMemberRole {
  teacher = "teacher",
  student = "student",
}

export type CourseMember = {
  id: number;
  email: string;
  created_at: string;
  course_id: number;
  role: CourseMemberRole;
};

export type CourseMaterial = {
  id: number;
  course_id: number;
  created_at: string;
  name: string;
  status: string;
  folder_id: number | null;
};

export type CourseFolder = {
  id: number;
  course_id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
};

export type Course = {
  id: number;
  created_at: string;
  title: string;
  course_members: CourseMember[];
  course_folders: CourseFolder[];
  course_materials: CourseMaterial[];
};
