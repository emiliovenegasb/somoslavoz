import { handleLeadPost } from "@/lib/form-guard"

export async function POST(request: Request) {
  return handleLeadPost(request, "contact")
}
