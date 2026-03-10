import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/sections/section-shell";
import { PageHero } from "@/components/sections/page-hero";

export const metadata = {
  title: "Blog & Insights",
  description: "Digital strategy, software development, and SaaS growth insights.",
};

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Prisma failed to fetch blog posts at build time, using empty array.", error);
  }

  return (
    <div className="pb-16 text-slate-900">
      <PageHero
        title="Blog & Insights"
        subtitle="Exploring the intersection of business strategy and high-performance software engineering."
      />

      <SectionShell>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-sm font-semibold text-primary-600">
                  Read article ?
                </p>
              </Card>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-slate-500">No blog posts found. Check back soon for new insights.</p>
          </div>
        )}
      </SectionShell>
    </div>
  );
}
