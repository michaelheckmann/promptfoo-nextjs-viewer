import { sendResponse } from "@/lib/send-response"

export async function GET(
  request: Request,
  { params }: { params: { experiment: string } }
) {
  try {
    return sendResponse(200, "hello")
  } catch (error) {
    return sendResponse(500, error)
  }
}
