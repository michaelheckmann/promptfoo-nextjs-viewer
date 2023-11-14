import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { experiment: string } }
) {
  try {
    return NextResponse.json(
      {
        data: "hello",
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    )
  }
}
