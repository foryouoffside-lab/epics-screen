import { buildMetadata } from "@/lib/seo";
import AdminUploader from "./AdminUploader";

export const metadata = {
  ...buildMetadata({
    title: "Admin · Upload Wallpaper",
    description: "Admin upload page for Epic's Screen.",
    path: "/admin"
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Upload Wallpaper</h1>
        <p>
          Add a new wallpaper to Epic&apos;s Screen. Provide a clear title, description and tags —
          these directly improve SEO ranking for the wallpaper&apos;s detail page.
        </p>
        <AdminUploader />
      </div>
    </div>
  );
}