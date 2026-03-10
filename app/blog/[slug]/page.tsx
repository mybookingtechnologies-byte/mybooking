import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await prisma.blog.findFirst({
      where: { slug: params.slug }
    });

    if (!post) return {};

    return {
      title: post.title,
      description: post.excerpt || "",
    };
  } catch (error) {
    console.warn("Failed to generate metadata for blog post at build time:", error);
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = null;

  try {
    post = await prisma.blog.findFirst({
      where: { slug: params.slug }
    });
  } catch (error) {
    console.error("Failed to fetch blog post at build time:", error);
  }

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto py-20 px-4 text-slate-900">
      <h1 className="text-4xl font-bold font-display mb-4">{post.title}</h1>
      <div className="prose prose-slate lg:prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
