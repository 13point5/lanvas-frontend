import { Database } from "@/app/supabase.types";

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

export type CourseMember =
  Database["public"]["Tables"]["course_members"]["Row"];

export type CourseMaterial =
  Database["public"]["Tables"]["course_materials"]["Row"];

export type CourseFolder =
  Database["public"]["Tables"]["course_folders"]["Row"];

export type Course = Database["public"]["Tables"]["courses"]["Row"];

export type CourseId = Course["id"];

export type CourseChat = Database["public"]["Tables"]["course_chats"]["Row"];

export type CourseChatMessage =
  Database["public"]["Tables"]["course_chat_messages"]["Row"];
