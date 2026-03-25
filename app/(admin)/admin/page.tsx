import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <LogoutButton />
      <p className="text-muted-foreground text-sm">
        Welcome back. More tools coming soon.
      </p>
    </div>
  );
}
