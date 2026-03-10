import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(25),
  businessType: z.string().min(2).max(80),
  message: z.string().min(10).max(1000),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  orgName: z.string().min(2),
});

export const createOrgSchema = z.object({
  name: z.string().min(2),
});

export const blogSchema = z.object({
  title: z.string().min(5).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(15).max(320),
  content: z.string().min(80),
});
