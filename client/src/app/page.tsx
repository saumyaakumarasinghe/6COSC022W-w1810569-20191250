import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          User Management System
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Manage your users with ease. Create, update, and delete users
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
