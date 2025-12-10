# Admin Portal Implementation Plan
## Professor Portfolio Content Management System

**Project**: Dynamic Admin Portal for Prof. Pius Owolawi's Portfolio  
**Developer**: Next.js Engineer  
**Date**: December 9, 2025  
**Goal**: Enable non-technical content management without code changes

---

## 📋 Executive Summary

Your boss wants to independently manage his portfolio content including:
- Speeches and presentations links
- Published papers and research
- Qualifications and education
- Awards and recognition
- Projects and research areas
- Gallery images
- Professional information
- Community initiatives

This plan outlines a complete admin portal with authentication, content management, and real-time updates.

---

## 🎯 Phase 1: Project Setup & Architecture (Week 1)

### 1.1 Technology Stack Selection

**Core Technologies:**
- **Database**: PostgreSQL (via Supabase or Vercel Postgres)
- **ORM**: Prisma (type-safe database access)
- **Authentication**: NextAuth.js (secure login)
- **File Storage**: Vercel Blob or Cloudinary (images/PDFs)
- **Admin UI**: React Admin or custom dashboard
- **Forms**: React Hook Form + Zod validation
- **Rich Text**: TipTap or Quill (for descriptions)

**Why this stack:**
- PostgreSQL: Reliable, scalable, free tier available
- Prisma: Easy database management, auto-generates TypeScript types
- NextAuth: Industry standard, secure, supports multiple providers
- Vercel Blob: Seamless integration with your deployment

### 1.2 Database Schema Design

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  password      String
  role          String    @default("admin")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model HeroSection {
  id            String    @id @default(cuid())
  title         String
  name          String
  subtitle      String
  description   String    @db.Text
  imageUrl      String
  stats         Json      // {publications: 200, funding: "R94M+"}
  updatedAt     DateTime  @updatedAt
}

model Education {
  id              String    @id @default(cuid())
  degree          String
  institution     String
  country         String
  yearStart       String
  yearEnd         String?
  specialization  String    @db.Text
  icon            String
  color           String
  bgColor         String
  order           Int       @default(0)
  isOngoing       Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Certification {
  id            String    @id @default(cuid())
  name          String
  fullName      String
  icon          String
  issuedBy      String?
  year          String?
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Award {
  id            String    @id @default(cuid())
  title         String
  year          String
  organization  String
  description   String    @db.Text
  icon          String
  color         String
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model ResearchArea {
  id            String    @id @default(cuid())
  title         String
  icon          String
  color         String
  description   String?   @db.Text
  projects      Json      // Array of project strings
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Publication {
  id            String    @id @default(cuid())
  title         String
  authors       String    @db.Text
  journal       String
  year          String
  doi           String?
  pdfUrl        String?
  citationCount Int       @default(0)
  type          String    // "journal", "conference", "book"
  abstract      String?   @db.Text
  keywords      String[]
  isPublished   Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Speech {
  id            String    @id @default(cuid())
  title         String
  event         String
  date          DateTime
  location      String
  description   String?   @db.Text
  videoUrl      String?
  slidesUrl     String?
  thumbnailUrl  String?
  type          String    // "keynote", "conference", "webinar"
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Achievement {
  id            String    @id @default(cuid())
  title         String
  count         String
  icon          String
  color         String
  details       String[]  // Array of detail strings
  category      String    // "supervision", "funding", "publications", etc.
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model ProfessionalMembership {
  id            String    @id @default(cuid())
  name          String
  role          String
  registrationNo String
  year          String?
  isActive      Boolean   @default(true)
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model CommunityInitiative {
  id            String    @id @default(cuid())
  title         String
  description   String    @db.Text
  icon          String
  color         String
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Testimonial {
  id            String    @id @default(cuid())
  quote         String    @db.Text
  author        String
  role          String
  organization  String?
  icon          String
  imageUrl      String?
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model GalleryImage {
  id            String    @id @default(cuid())
  title         String
  imageUrl      String
  altText       String
  category      String    // "lab", "event", "award", "research"
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  uploadedAt    DateTime  @default(now())
}

model SiteSettings {
  id            String    @id @default(cuid())
  key           String    @unique
  value         Json
  updatedAt     DateTime  @updatedAt
}
```

### 1.3 Project Structure

```
Pius-Adewale-Owolawi/
├── app/
│   ├── (admin)/              # Admin routes with layout
│   │   ├── layout.tsx        # Admin dashboard layout
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Dashboard overview
│   │   ├── education/
│   │   │   ├── page.tsx      # List education
│   │   │   ├── new/page.tsx  # Add education
│   │   │   └── [id]/edit/page.tsx
│   │   ├── certifications/
│   │   ├── awards/
│   │   ├── publications/
│   │   ├── speeches/
│   │   ├── research-areas/
│   │   ├── achievements/
│   │   ├── memberships/
│   │   ├── initiatives/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   └── settings/
│   ├── (auth)/               # Auth routes
│   │   ├── login/page.tsx
│   │   └── logout/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── education/route.ts
│   │   ├── publications/route.ts
│   │   ├── speeches/route.ts
│   │   ├── upload/route.ts   # File upload endpoint
│   │   └── [...other endpoints]
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Public homepage
├── components/
│   ├── admin/                # Admin-specific components
│   │   ├── AdminNav.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DataTable.tsx
│   │   ├── FormModal.tsx
│   │   └── FileUploader.tsx
│   ├── forms/                # Reusable form components
│   │   ├── EducationForm.tsx
│   │   ├── PublicationForm.tsx
│   │   ├── SpeechForm.tsx
│   │   └── [...other forms]
│   └── [existing components]
├── lib/
│   ├── prisma.ts             # Prisma client
│   ├── auth.ts               # NextAuth config
│   ├── validations/          # Zod schemas
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts               # Seed current data
│   └── migrations/
├── public/
│   └── img/
└── styles/
```

---

## 🔐 Phase 2: Authentication System (Week 1-2)

### 2.1 Install Dependencies

```bash
npm install next-auth @prisma/client prisma bcryptjs
npm install -D @types/bcryptjs
npm install zod react-hook-form @hookform/resolvers
```

### 2.2 Setup NextAuth

**File: `lib/auth.ts`**
```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
};
```

### 2.3 Create Login Page

**File: `app/(auth)/login/page.tsx`**
```typescript
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Admin Login
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### 2.4 Protect Admin Routes

**File: `middleware.ts`**
```typescript
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
```

---

## 🎨 Phase 3: Admin Dashboard UI (Week 2)

### 3.1 Dashboard Layout

**File: `app/(admin)/layout.tsx`**
```typescript
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNav user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 3.2 Sidebar Component

**File: `components/admin/Sidebar.tsx`**
```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: "ri-dashboard-line", href: "/dashboard" },
  { title: "Education", icon: "ri-graduation-cap-line", href: "/dashboard/education" },
  { title: "Certifications", icon: "ri-medal-line", href: "/dashboard/certifications" },
  { title: "Awards", icon: "ri-trophy-line", href: "/dashboard/awards" },
  { title: "Publications", icon: "ri-article-line", href: "/dashboard/publications" },
  { title: "Speeches", icon: "ri-presentation-line", href: "/dashboard/speeches" },
  { title: "Research Areas", icon: "ri-flask-line", href: "/dashboard/research-areas" },
  { title: "Achievements", icon: "ri-star-line", href: "/dashboard/achievements" },
  { title: "Memberships", icon: "ri-team-line", href: "/dashboard/memberships" },
  { title: "Initiatives", icon: "ri-heart-line", href: "/dashboard/initiatives" },
  { title: "Testimonials", icon: "ri-chat-quote-line", href: "/dashboard/testimonials" },
  { title: "Gallery", icon: "ri-image-line", href: "/dashboard/gallery" },
  { title: "Settings", icon: "ri-settings-line", href: "/dashboard/settings" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-blue-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Portal</h2>
        <p className="text-sm text-gray-300">Content Manager</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition ${
              pathname === item.href ? "bg-white/20 border-l-4 border-blue-400" : ""
            }`}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

### 3.3 Dashboard Overview

**File: `app/(admin)/dashboard/page.tsx`**
```typescript
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const stats = await Promise.all([
    prisma.education.count(),
    prisma.publication.count(),
    prisma.speech.count(),
    prisma.award.count(),
    prisma.galleryImage.count()
  ]);

  const cards = [
    { title: "Education Records", count: stats[0], icon: "ri-graduation-cap-line", color: "blue" },
    { title: "Publications", count: stats[1], icon: "ri-article-line", color: "purple" },
    { title: "Speeches", count: stats[2], icon: "ri-presentation-line", color: "green" },
    { title: "Awards", count: stats[3], icon: "ri-trophy-line", color: "orange" },
    { title: "Gallery Images", count: stats[4], icon: "ri-image-line", color: "pink" }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-xl shadow-lg">
            <div className={`w-12 h-12 bg-${card.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <i className={`${card.icon} text-2xl text-${card.color}-600`}></i>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition">
            <i className="ri-add-line text-2xl text-blue-600 mb-2"></i>
            <p className="text-sm text-gray-700">Add Publication</p>
          </button>
          <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <i className="ri-add-line text-2xl text-purple-600 mb-2"></i>
            <p className="text-sm text-gray-700">Add Speech</p>
          </button>
          <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition">
            <i className="ri-upload-line text-2xl text-green-600 mb-2"></i>
            <p className="text-sm text-gray-700">Upload Image</p>
          </button>
          <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition">
            <i className="ri-trophy-line text-2xl text-orange-600 mb-2"></i>
            <p className="text-sm text-gray-700">Add Award</p>
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 Phase 4: Content Management Pages (Week 3-4)

### 4.1 Publications Management (Most Important)

**File: `app/(admin)/dashboard/publications/page.tsx`**
```typescript
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({
    orderBy: { year: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Publications</h1>
        <Link
          href="/dashboard/publications/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Add Publication
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Journal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{pub.title}</div>
                  <div className="text-sm text-gray-500">{pub.authors}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{pub.journal}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{pub.year}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {pub.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/publications/${pub.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={pub.id}
                      endpoint="/api/publications"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**File: `app/(admin)/dashboard/publications/new/page.tsx`**
```typescript
import PublicationForm from "@/components/forms/PublicationForm";

export default function NewPublicationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Publication</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <PublicationForm />
      </div>
    </div>
  );
}
```

**File: `components/forms/PublicationForm.tsx`**
```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const publicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authors: z.string().min(1, "Authors are required"),
  journal: z.string().min(1, "Journal is required"),
  year: z.string().min(4).max(4),
  doi: z.string().optional(),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  type: z.enum(["journal", "conference", "book"]),
  abstract: z.string().optional(),
  keywords: z.string().optional(),
  citationCount: z.number().min(0).optional()
});

type PublicationFormData = z.infer<typeof publicationSchema>;

export default function PublicationForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: PublicationFormData) => {
    setLoading(true);
    try {
      const keywords = data.keywords ? data.keywords.split(",").map(k => k.trim()) : [];
      
      const response = await fetch(
        initialData ? `/api/publications/${initialData.id}` : "/api/publications",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, keywords })
        }
      );

      if (response.ok) {
        router.push("/dashboard/publications");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving publication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          {...register("title")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Authors * (comma-separated)
        </label>
        <input
          {...register("authors")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe, Jane Smith, ..."
        />
        {errors.authors && (
          <p className="text-red-500 text-sm mt-1">{errors.authors.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Journal/Conference *
          </label>
          <input
            {...register("journal")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.journal && (
            <p className="text-red-500 text-sm mt-1">{errors.journal.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <input
            {...register("year")}
            type="text"
            maxLength={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="2024"
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type *
          </label>
          <select
            {...register("type")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
            <option value="book">Book</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Citation Count
          </label>
          <input
            {...register("citationCount", { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DOI
        </label>
        <input
          {...register("doi")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="10.1234/example"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PDF URL
        </label>
        <input
          {...register("pdfUrl")}
          type="url"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Abstract
        </label>
        <textarea
          {...register("abstract")}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keywords (comma-separated)
        </label>
        <input
          {...register("keywords")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="AI, Machine Learning, Neural Networks"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update" : "Create"} Publication
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

### 4.2 Speeches Management

**File: `app/(admin)/dashboard/speeches/page.tsx`**
```typescript
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SpeechesPage() {
  const speeches = await prisma.speech.findMany({
    orderBy: { date: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Speeches & Presentations</h1>
        <Link
          href="/dashboard/speeches/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line mr-2"></i>
          Add Speech
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speeches.map((speech) => (
          <div key={speech.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {speech.thumbnailUrl && (
              <img
                src={speech.thumbnailUrl}
                alt={speech.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <span className="text-xs font-semibold text-blue-600 uppercase">
                {speech.type}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                {speech.title}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <i className="ri-calendar-line mr-2"></i>
                  {new Date(speech.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="ri-map-pin-line mr-2"></i>
                  {speech.location}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="ri-building-line mr-2"></i>
                  {speech.event}
                </p>
              </div>
              <div className="flex gap-2">
                {speech.videoUrl && (
                  <a
                    href={speech.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <i className="ri-video-line mr-1"></i>
                    Video
                  </a>
                )}
                {speech.slidesUrl && (
                  <a
                    href={speech.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    <i className="ri-slideshow-line mr-1"></i>
                    Slides
                  </a>
                )}
              </div>
              <div className="mt-4 pt-4 border-t flex gap-2">
                <Link
                  href={`/dashboard/speeches/${speech.id}/edit`}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4.3 Similar Structure for Other Sections

Follow the same pattern for:
- Education
- Certifications
- Awards
- Research Areas
- Achievements
- Memberships
- Initiatives
- Testimonials
- Gallery

---

## 🔌 Phase 5: API Endpoints (Week 4)

### 5.1 Publications API

**File: `app/api/publications/route.ts`**
```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const publications = await prisma.publication.findMany({
    orderBy: { year: "desc" }
  });
  return NextResponse.json(publications);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  
  const publication = await prisma.publication.create({
    data
  });

  return NextResponse.json(publication);
}
```

**File: `app/api/publications/[id]/route.ts`**
```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  
  const publication = await prisma.publication.update({
    where: { id: params.id },
    data
  });

  return NextResponse.json(publication);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.publication.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ success: true });
}
```

### 5.2 Create Similar APIs for All Models

Replicate the same pattern for:
- `/api/education`
- `/api/speeches`
- `/api/awards`
- `/api/certifications`
- `/api/research-areas`
- `/api/achievements`
- `/api/memberships`
- `/api/initiatives`
- `/api/testimonials`
- `/api/gallery`

---

## 📤 Phase 6: File Upload System (Week 5)

### 6.1 Setup Vercel Blob

```bash
npm install @vercel/blob
```

**File: `app/api/upload/route.ts`**
```typescript
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public"
  });

  return NextResponse.json({ url: blob.url });
}
```

### 6.2 File Upload Component

**File: `components/admin/FileUploader.tsx`**
```typescript
"use client";

import { useState } from "react";

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function FileUploader({
  onUploadComplete,
  accept = "image/*",
  label = "Upload File"
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover mx-auto mb-4 rounded" />
        )}
        <input
          type="file"
          accept={accept}
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
        >
          {uploading ? "Uploading..." : "Choose File"}
        </label>
      </div>
    </div>
  );
}
```

---

## 🔄 Phase 7: Update Frontend Components (Week 5-6)

### 7.1 Convert Static Data to API Calls

**File: `components/Education.tsx` (Updated)**
```typescript
"use client";

import { useEffect, useState } from "react";
// ... existing imports

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    // Fetch education data
    fetch("/api/education")
      .then(res => res.json())
      .then(data => setEducationData(data));

    // Fetch certifications
    fetch("/api/certifications")
      .then(res => res.json())
      .then(data => setCertifications(data));

    // ... existing GSAP animations
  }, []);

  return (
    // ... existing JSX with dynamic data
  );
};
```

### 7.2 Update All Components

Convert these components to fetch from API:
- `Hero.tsx`
- `Education.tsx`
- `Achieved.tsx`
- `Project.tsx`
- `WhatHaveDone.tsx`
- `RecommendationText.tsx`
- `Gallery.tsx`

---

## 🚀 Phase 8: Deployment & Testing (Week 6)

### 8.1 Environment Variables

**File: `.env.local`**
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### 8.2 Create Initial Admin User

**File: `scripts/create-admin.ts`**
```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("SecurePassword123!", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin"
    }
  });

  console.log("Admin user created!");
}

main();
```

Run: `npx tsx scripts/create-admin.ts`

### 8.3 Migrate Existing Data

**File: `prisma/seed.ts`**
```typescript
// Copy all current hardcoded data into database
// Run: npx prisma db seed
```

---

## 📚 Phase 9: Documentation for Your Boss (Week 6)

### 9.1 Create User Guide

**File: `USER_GUIDE.md`**
```markdown
# Admin Portal User Guide

## How to Login
1. Go to: https://your-site.com/login
2. Email: admin@example.com
3. Password: [provided separately]

## Managing Publications
1. Click "Publications" in sidebar
2. Click "Add Publication" button
3. Fill in the form:
   - Title: Full paper title
   - Authors: Comma-separated names
   - Journal: Where published
   - Year: Publication year
   - DOI: Optional link
   - PDF: Upload or paste link
4. Click "Create Publication"

## Managing Speeches
1. Click "Speeches" in sidebar
2. Click "Add Speech"
3. Add video/slides links
4. Upload thumbnail image

[Continue for each section...]
```

### 9.2 Video Tutorial Script

Create screen recordings showing:
1. How to login
2. How to add a publication
3. How to add a speech with links
4. How to upload images
5. How to edit existing content
6. How to delete content

---

## ✅ Implementation Checklist

### Week 1: Foundation
- [ ] Setup Prisma with PostgreSQL
- [ ] Create database schema
- [ ] Setup NextAuth authentication
- [ ] Create login page
- [ ] Setup middleware protection

### Week 2: Admin UI
- [ ] Build admin layout
- [ ] Create sidebar navigation
- [ ] Build dashboard overview
- [ ] Create reusable components

### Week 3: Core Features
- [ ] Publications CRUD
- [ ] Speeches CRUD
- [ ] Education CRUD
- [ ] Awards CRUD

### Week 4: Extended Features
- [ ] All remaining sections CRUD
- [ ] API endpoints for all models
- [ ] Form validations
- [ ] Error handling

### Week 5: File Management
- [ ] Setup Vercel Blob
- [ ] Create upload endpoint
- [ ] Build file uploader component
- [ ] Integrate with forms

### Week 6: Integration & Testing
- [ ] Convert frontend to dynamic
- [ ] Test all CRUD operations
- [ ] Seed initial data
- [ ] Deploy to Vercel
- [ ] Create user documentation

---

## 🎁 Additional Features (Optional)

### Advanced Features
1. **Search & Filters**: Add search across publications, speeches
2. **Bulk Operations**: Import multiple publications from CSV
3. **Analytics**: Track page views, popular content
4. **SEO Management**: Edit meta tags per page
5. **Email Notifications**: Alert on new comments/inquiries
6. **Version History**: Track changes to content
7. **Draft Mode**: Save without publishing
8. **Scheduling**: Schedule future publication dates
9. **Multi-language**: Support for content in multiple languages
10. **API Keys**: Generate keys for external integrations

---

## 💰 Cost Breakdown

**Free Tier (Recommended for Start):**
- Vercel Hosting: Free
- PostgreSQL (Supabase): Free up to 500MB
- NextAuth: Free (open source)
- Vercel Blob: 5GB free

**Paid Tier (If Needed):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Cloudinary: $0-$99/month

**Total to Start: $0/month**

---

## 🔒 Security Considerations

1. **Password Policy**: Strong passwords required
2. **Session Timeout**: Auto-logout after 24 hours
3. **HTTPS Only**: Enforce SSL
4. **Input Validation**: Zod schemas on all forms
5. **SQL Injection**: Protected by Prisma
6. **File Upload**: Validate file types and sizes
7. **Rate Limiting**: Prevent spam (add later)
8. **Backup Strategy**: Daily database backups

---

## 📞 Support Plan

**For Your Boss:**
1. Initial training session (1 hour)
2. Written user guide with screenshots
3. Video tutorials for common tasks
4. Email support channel
5. Monthly check-ins

**For You:**
1. Code documentation
2. API documentation
3. Deployment guide
4. Troubleshooting guide
5. Future enhancement roadmap

---

## 🎯 Success Metrics

After implementation, your boss can:
- ✅ Add new publications in 2 minutes
- ✅ Upload speech videos/slides without code
- ✅ Update qualifications anytime
- ✅ Add gallery images independently
- ✅ Manage all content from phone/tablet
- ✅ See all changes reflect immediately

---

## 📝 Next Steps

1. Review this plan with your boss
2. Get approval for tech stack
3. Setup development environment
4. Start with Phase 1 (Week 1)
5. Weekly progress demos
6. Launch after Week 6

---

**Estimated Timeline**: 6 weeks  
**Complexity**: Intermediate  
**Maintenance**: Low (after launch)  
**Scalability**: High

This solution will transform the portfolio from static to fully dynamic, giving your boss complete control over his content without ever touching code!
