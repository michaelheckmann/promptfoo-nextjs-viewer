import { NextResponse } from "next/server"

export const sendResponse = (status: number, data: unknown) => {
  if (status < 300) {
    return NextResponse.json(
      {
        data,
      },
      {
        status,
      }
    )
  } else {
    return NextResponse.json(
      {
        error: data,
      },
      {
        status,
      }
    )
  }
}
