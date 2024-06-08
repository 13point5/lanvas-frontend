export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course_chat_messages: {
        Row: {
          chat_id: number
          content: string
          created_at: string
          id: number
          metadata: Json | null
          role: string
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string
          id?: number
          metadata?: Json | null
          role: string
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string
          id?: number
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_course_chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "course_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      course_chat_topics: {
        Row: {
          count: number
          course_id: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          count?: number
          course_id: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          count?: number
          course_id?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_chat_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_chats: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          member_id: number
          title: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          member_id: number
          title?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          member_id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_course_chats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_course_chats_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "course_members"
            referencedColumns: ["id"]
          },
        ]
      }
      course_folders: {
        Row: {
          course_id: number
          created_at: string
          id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_folders_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_course_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "course_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      course_materials: {
        Row: {
          course_id: number
          created_at: string
          folder_id: number | null
          id: number
          name: string
          status: string | null
        }
        Insert: {
          course_id: number
          created_at?: string
          folder_id?: number | null
          id?: number
          name: string
          status?: string | null
        }
        Update: {
          course_id?: number
          created_at?: string
          folder_id?: number | null
          id?: number
          name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_course_materials_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "course_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      course_members: {
        Row: {
          course_id: number
          created_at: string
          email: string
          id: number
          role: string
        }
        Insert: {
          course_id: number
          created_at?: string
          email: string
          id?: number
          role: string
        }
        Update: {
          course_id?: number
          created_at?: string
          email?: string
          id?: number
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_members_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string
          course_id: number
          embedding: string
          file_id: number
          id: number
          metadata: Json
        }
        Insert: {
          content: string
          course_id: number
          embedding: string
          file_id: number
          id?: number
          metadata: Json
        }
        Update: {
          content?: string
          course_id?: number
          embedding?: string
          file_id?: number
          id?: number
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "documents_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_documents_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "course_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_chat_messages: {
        Row: {
          content: string | null
          created_at: string
          id: number
          metadata: Json | null
          role: string | null
          tool_chat_id: number | null
          user_email: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          role?: string | null
          tool_chat_id?: number | null
          user_email?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          metadata?: Json | null
          role?: string | null
          tool_chat_id?: number | null
          user_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_tool_chat_messages_tool_chat_id_fkey"
            columns: ["tool_chat_id"]
            isOneToOne: false
            referencedRelation: "tool_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_chats: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          title: string | null
          tool_id: number | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          title?: string | null
          tool_id?: number | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          title?: string | null
          tool_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_tool_chats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_tool_chats_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documents_by_course_id: {
        Args: {
          query_embedding: string
          course_id_arg: number
          match_count?: number
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documents_by_file_ids: {
        Args: {
          query_embedding: string
          file_ids: number[]
          match_count?: number
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
