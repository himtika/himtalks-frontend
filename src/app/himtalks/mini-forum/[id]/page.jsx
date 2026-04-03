"use client";

import ForumDetail from "@/components/ForumDetail";
import { useParams } from "next/navigation";

export default function ForumDetailPage() {
  const params = useParams();
  const slug = params?.id || "";
  const idOnly = slug.split("-")[0];

  return <ForumDetail forumId={idOnly} />;
}