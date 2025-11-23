export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      nominees: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string | null;
          instagram: string | null;
          image_url: string | null;
          video_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string | null;
          instagram?: string | null;
          image_url?: string | null;
          video_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string | null;
          instagram?: string | null;
          image_url?: string | null;
          video_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          phone: string;
          verified_email: boolean;
          verified_phone: boolean;
          fingerprint: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          phone: string;
          verified_email?: boolean;
          verified_phone?: boolean;
          fingerprint?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          phone?: string;
          verified_email?: boolean;
          verified_phone?: boolean;
          fingerprint?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      votes: {
        Row: {
          id: string;
          user_id: string;
          nominee_id: string;
          category_id: string;
          voted_at: string;
          ip_address: string | null;
          fingerprint: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          nominee_id: string;
          category_id: string;
          voted_at?: string;
          ip_address?: string | null;
          fingerprint?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          nominee_id?: string;
          category_id?: string;
          voted_at?: string;
          ip_address?: string | null;
          fingerprint?: string | null;
          user_agent?: string | null;
        };
      };
      verification_codes: {
        Row: {
          id: string;
          user_id: string;
          code: string;
          type: "email" | "sms";
          expires_at: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          code: string;
          type: "email" | "sms";
          expires_at: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          code?: string;
          type?: "email" | "sms";
          expires_at?: string;
          verified?: boolean;
          created_at?: string;
        };
      };
      vote_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          ip_address: string | null;
          user_agent: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      fraud_detection_logs: {
        Row: {
          id: string;
          user_id: string | null;
          vote_id: string | null;
          fraud_type: string;
          severity: "low" | "medium" | "high";
          details: Json | null;
          ip_address: string | null;
          fingerprint: string | null;
          resolved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          vote_id?: string | null;
          fraud_type: string;
          severity: "low" | "medium" | "high";
          details?: Json | null;
          ip_address?: string | null;
          fingerprint?: string | null;
          resolved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          vote_id?: string | null;
          fraud_type?: string;
          severity?: "low" | "medium" | "high";
          details?: Json | null;
          ip_address?: string | null;
          fingerprint?: string | null;
          resolved?: boolean;
          created_at?: string;
        };
      };
    };
  };
}


