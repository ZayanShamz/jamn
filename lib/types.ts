import type { Timestamp } from "firebase/firestore";

export interface ExtractedJob {
  job_title: string;
  company: string;
  location: string;
  work_arrangement: string;
  employment_type: string;
  job_description: string;
  responsibilities: string;
  requirements: string;
  salary: string;
}

export interface Job extends ExtractedJob {
  id: string;
  applied_date: string;
  platform: string;
  source_url: string;
  user_notes: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
