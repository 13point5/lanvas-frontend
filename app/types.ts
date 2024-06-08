import { Database } from "@/app/supabase.types";

export enum FormStatus {
  Idle,
  Loading,
  Error,
  Success,
}

export enum AccessLevel {
  Read,
  Edit,
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

export type CourseChatTopic =
  Database["public"]["Tables"]["course_chat_topics"]["Row"];
