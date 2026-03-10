import { PrismaClient } from "./generated-client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  
  const org = await prisma.organization.upsert({
    where: { slug: "mybooking-tech" },
    update: {},
    create: {
      name: "MyBooking Technologies",
      slug: "mybooking-tech",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@mybooking.com" },
    update: { passwordHash },
    create: {
      email: "admin@mybooking.com",
      passwordHash,
      name: "Super Admin",
      memberships: {
        create: {
          role: "OWNER",
          organizationId: org.id,
        },
      },
    },
  });

  console.log({ org, user });

  const posts = [
    {
      title: "How to Build Modern SaaS Architectures",
      slug: "modern-saas-architectures",
      excerpt: "Building software that scales requires strategic decisions from day one.",
      content: "<p>Strategic decisions about technology stacks and architecture are vital...</p>",
      published: true,
      organizationId: org.id,
    },
    {
      title: "The Future of Digital Transformation in Hospitality",
      slug: "future-of-hospitality-tech",
      excerpt: "Technology is redefining guest experiences and operational efficiency.",
      content: "<p>Digital transformation in hospitality is no longer optional...</p>",
      published: true,
      organizationId: org.id,
    },
  ];

  for (const post of posts) {
    await prisma.blog.upsert({
      where: { organizationId_slug: { organizationId: org.id, slug: post.slug } },
      update: post,
      create: post,
    });
  }

  const leads = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      businessType: "Hotel",
      message: "Interested in your booking platform.",
      organizationId: org.id,
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({
      data: lead,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
