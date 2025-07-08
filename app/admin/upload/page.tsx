"use client"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, X, ArrowLeft, Download, Eye, Brain, Loader2 } from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"
import { useDropzone } from "react-dropzone"

interface UploadedFile {
  file: File
  id: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  extractedQuestions?: any[]
  error?: string
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [customInstructions, setCustomInstructions] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "uploading",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate file processing
    newFiles.forEach((uploadedFile) => {
      processFile(uploadedFile)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const processFile = async (uploadedFile: UploadedFile) => {
    try {
      // Update status to processing
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === uploadedFile.id ? { ...f, status: "processing", progress: 20 } : f)),
      )

      const formData = new FormData()
      formData.append("file", uploadedFile.file)
      formData.append("subject", selectedSubject)
      formData.append("difficulty", selectedDifficulty)
      formData.append("instructions", customInstructions)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === uploadedFile.id && f.progress < 90) {
              return { ...f, progress: f.progress + 10 }
            }
            return f
          }),
        )
      }, 500)

      const response = await fetch("/api/upload/questions", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "completed",
                progress: 100,
                extractedQuestions: result.questions,
              }
            : f,
        ),
      )
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "error",
                progress: 0,
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : f,
        ),
      )
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
    }
  }

  const totalQuestions = uploadedFiles.reduce((sum, file) => sum + (file.extractedQuestions?.length || 0), 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-2" />
            <SmartCBTLogo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Smart CBT</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Upload Questions</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            {totalQuestions > 0 && <Badge variant="secondary">{totalQuestions} Questions Extracted</Badge>}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Upload Questions</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload question documents and let AI extract and format them automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Configuration</CardTitle>
                <CardDescription>Set default properties for uploaded questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Default Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Default Difficulty</Label>
                    <select
                      id="difficulty"
                      className="w-full border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-800"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Special instructions for AI processing..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Files</span>
                </CardTitle>
                <CardDescription>
                  Drag and drop files or click to browse. Supports PDF, DOCX, and TXT files up to 10MB.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Drop files here...</p>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">
                        Upload Question Files
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Drag and drop files here, or click to browse
                      </p>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </>
                  )}
                  <p className="text-xs text-slate-400 mt-4">Supports PDF, DOCX, TXT files (max 10MB each)</p>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing Files</CardTitle>
                  <CardDescription>AI is extracting questions from your uploaded files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedFiles.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">{uploadedFile.file.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(uploadedFile.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {uploadedFile.status !== "error" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">
                              {uploadedFile.status === "uploading"
                                ? "Uploading..."
                                : uploadedFile.status === "processing"
                                  ? "Processing with AI..."
                                  : "Completed"}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">{uploadedFile.progress}%</span>
                          </div>
                          <Progress value={uploadedFile.progress} className="h-2" />
                        </div>
                      )}

                      {uploadedFile.status === "error" && (
                        <div className="text-red-600 text-sm">{uploadedFile.error}</div>
                      )}

                      {uploadedFile.status === "completed" && uploadedFile.extractedQuestions && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                {uploadedFile.extractedQuestions.length} questions extracted
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Files Uploaded</span>
                  <span className="font-medium">{uploadedFiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Questions Extracted</span>
                  <span className="font-medium text-green-600">{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Processing</span>
                  <span className="font-medium">
                    {uploadedFiles.filter((f) => f.status === "processing" || f.status === "uploading").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Errors</span>
                  <span className="font-medium text-red-600">
                    {uploadedFiles.filter((f) => f.status === "error").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Automatic question extraction</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Answer option formatting</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Subject classification</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Difficulty assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Explanation generation</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/admin/exams/create">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Exam
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/admin/content">
                    <Eye className="w-4 h-4 mr-2" />
                    View Question Bank
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/admin/analytics">
                    <Download className="w-4 h-4 mr-2" />
                    Export Questions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
