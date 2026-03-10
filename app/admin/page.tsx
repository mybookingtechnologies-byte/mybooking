export default function AdminLegacyRedirect() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Legacy Admin Page</h1>
      <p>Please use the new <a href="/dashboard/overview" className="text-primary-600 underline">Dashboard</a>.</p>
    </div>
  );
}
