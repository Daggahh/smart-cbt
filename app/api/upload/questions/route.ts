import { type NextRequest, NextResponse } from "next/server"
import { fileProcessor } from "@/lib/upload/processor"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileType = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const content = await file.text()
    let result

    switch (fileType) {
      case "csv":
        result = await fileProcessor.processCSVFile(content)
        break
      case "json":
        result = await fileProcessor.processTextFile(content)
        break
      case "pdf":
        result = await fileProcessor.processPDFFile(content)
        break
      default:
        result = await fileProcessor.processTextFile(content)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get("format")

  try {
    let sample
    if (format === "csv") {
      sample = await fileProcessor.generateSampleCSV()
      return new NextResponse(sample, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=sample-questions.csv",
        },
      })
    } else {
      sample = await fileProcessor.generateSampleJSON()
      return new NextResponse(sample, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": "attachment; filename=sample-questions.json",
        },
      })
    }
  } catch (error) {
    console.error("Error generating sample:", error)
    return NextResponse.json({ error: "Failed to generate sample" }, { status: 500 })
  }
}
