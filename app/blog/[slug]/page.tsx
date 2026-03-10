import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blog.findFirst({
    where: { slug: params.slug }
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blog.findFirst({
    where: { slug: params.slug }
  });

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto py-20 px-4 text-slate-900">
      <h1 className="text-4xl font-bold font-display mb-4">{post.title}</h1>
      <div className="prose prose-slate lg:prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
