import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to tickets page
  redirect("/tickets");
}
