"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2, Upload, Calendar, Settings, BookOpen, Shield, Brain } from "lucide-react"
import Link from "next/link"
import { SmartCBTLogo } from "@/components/smart-cbt-logo"

export default function CreateExam() {
  const [examData, setExamData] = useState({
    title: "",
    description: "",
    duration: 120,
    totalQuestions: 50,
    passingScore: 50,
    randomizeQuestions: true,
    randomizeOptions: true,
    allowReview: true,
    showResultsImmediately: false,
    startDate: "",
    endDate: "",
    subjects: [] as string[],
    questionBanks: [] as string[],
  })

  const [newSubject, setNewSubject] = useState("")
  const [currentStep, setCurrentStep] = useState("basic")

  const availableQuestionBanks = [
    { id: 1, name: "Mathematics Question Bank 2024", questions: 500, subject: "Mathematics" },
    { id: 2, name: "English Language Questions", questions: 300, subject: "English" },
    { id: 3, name: "Physics Practice Questions", questions: 400, subject: "Physics" },
    { id: 4, name: "Chemistry Mock Questions", questions: 350, subject: "Chemistry" },
  ]

  const handleAddSubject = () => {
    if (newSubject.trim() && !examData.subjects.includes(newSubject.trim())) {
      setExamData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()],
      }))
      setNewSubject("")
    }
  }

  const handleRemoveSubject = (subject: string) => {
    setExamData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }))
  }

  const handleSaveExam = () => {
    // Implementation for saving exam
    console.log("Saving exam:", examData)
    // Redirect to exams list or show success message
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/exams">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Exams
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-300 mx-2" />
            <SmartCBTLogo className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Smart CBT</h1>
              <p className="text-xs text-slate-600">Create New Exam</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleSaveExam}>
              <Save className="w-4 h-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Create New Exam</h1>
          <p className="text-slate-600">Set up a new examination with questions, timing, and security settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Setup Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg ${currentStep === "basic" ? "bg-blue-50 border border-blue-200" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === "basic" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    1
                  </div>
                  <span className="text-sm font-medium">Basic Info</span>
                </div>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg ${currentStep === "questions" ? "bg-blue-50 border border-blue-200" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === "questions" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    2
                  </div>
                  <span className="text-sm font-medium">Questions</span>
                </div>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg ${currentStep === "schedule" ? "bg-blue-50 border border-blue-200" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === "schedule" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    3
                  </div>
                  <span className="text-sm font-medium">Schedule</span>
                </div>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg ${currentStep === "settings" ? "bg-blue-50 border border-blue-200" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === "settings" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    4
                  </div>
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Basic</span>
                </TabsTrigger>
                <TabsTrigger value="questions" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Questions</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the basic details for your examination</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Exam Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., JAMB UTME Mathematics 2024"
                        value={examData.title}
                        onChange={(e) => setExamData((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the examination"
                        value={examData.description}
                        onChange={(e) => setExamData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes) *</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={examData.duration}
                          onChange={(e) =>
                            setExamData((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalQuestions">Total Questions *</Label>
                        <Input
                          id="totalQuestions"
                          type="number"
                          value={examData.totalQuestions}
                          onChange={(e) =>
                            setExamData((prev) => ({ ...prev, totalQuestions: Number.parseInt(e.target.value) }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passingScore">Passing Score (%) *</Label>
                        <Input
                          id="passingScore"
                          type="number"
                          min="0"
                          max="100"
                          value={examData.passingScore}
                          onChange={(e) =>
                            setExamData((prev) => ({ ...prev, passingScore: Number.parseInt(e.target.value) }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Subjects</Label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add subject"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddSubject()}
                        />
                        <Button type="button" onClick={handleAddSubject}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {examData.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="flex items-center space-x-1">
                            <span>{subject}</span>
                            <button onClick={() => handleRemoveSubject(subject)} className="ml-1 hover:text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Questions */}
              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Question Banks</CardTitle>
                    <CardDescription>Select question banks to include in this examination</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableQuestionBanks.map((bank) => (
                      <div key={bank.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{bank.name}</h4>
                          <p className="text-sm text-slate-600">
                            {bank.questions} questions • {bank.subject}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upload New Questions</CardTitle>
                    <CardDescription>Upload questions via PDF, Word documents, or structured text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">Upload Question Files</h3>
                      <p className="text-slate-500 mb-4">Drag and drop files here, or click to browse</p>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                      <p className="text-xs text-slate-400 mt-2">Supports PDF, DOCX, TXT files</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Schedule</CardTitle>
                    <CardDescription>Set the examination dates and create batches</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          value={examData.startDate}
                          onChange={(e) => setExamData((prev) => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date *</Label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          value={examData.endDate}
                          onChange={(e) => setExamData((prev) => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Batch Configuration</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Candidates per Batch</Label>
                            <Input type="number" placeholder="1000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Number of Batches</Label>
                            <Input type="number" placeholder="10" />
                          </div>
                          <div className="space-y-2">
                            <Label>Time Between Batches</Label>
                            <Input placeholder="30 minutes" />
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Auto-Generate Batches
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Security Settings</span>
                    </CardTitle>
                    <CardDescription>Configure anti-cheating and security measures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="randomizeQuestions">Randomize Question Order</Label>
                        <p className="text-sm text-slate-600">Questions appear in different order for each candidate</p>
                      </div>
                      <Switch
                        id="randomizeQuestions"
                        checked={examData.randomizeQuestions}
                        onCheckedChange={(checked) => setExamData((prev) => ({ ...prev, randomizeQuestions: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="randomizeOptions">Randomize Answer Options</Label>
                        <p className="text-sm text-slate-600">Answer choices appear in different order</p>
                      </div>
                      <Switch
                        id="randomizeOptions"
                        checked={examData.randomizeOptions}
                        onCheckedChange={(checked) => setExamData((prev) => ({ ...prev, randomizeOptions: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowReview">Allow Question Review</Label>
                        <p className="text-sm text-slate-600">Students can review and change answers</p>
                      </div>
                      <Switch
                        id="allowReview"
                        checked={examData.allowReview}
                        onCheckedChange={(checked) => setExamData((prev) => ({ ...prev, allowReview: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI & Results Settings</span>
                    </CardTitle>
                    <CardDescription>Configure AI scoring and result delivery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showResultsImmediately">Show Results Immediately</Label>
                        <p className="text-sm text-slate-600">Display results right after exam completion</p>
                      </div>
                      <Switch
                        id="showResultsImmediately"
                        checked={examData.showResultsImmediately}
                        onCheckedChange={(checked) =>
                          setExamData((prev) => ({ ...prev, showResultsImmediately: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>AI Feedback Level</Label>
                      <select className="w-full border border-slate-300 rounded-md px-3 py-2">
                        <option value="basic">Basic - Score only</option>
                        <option value="detailed">Detailed - With explanations</option>
                        <option value="comprehensive">Comprehensive - With recommendations</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Notification Template</Label>
                      <select className="w-full border border-slate-300 rounded-md px-3 py-2">
                        <option value="standard">Standard Result Email</option>
                        <option value="detailed">Detailed Performance Report</option>
                        <option value="custom">Custom Template</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  const steps = ["basic", "questions", "schedule", "settings"]
                  const currentIndex = steps.indexOf(currentStep)
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1])
                  }
                }}
                disabled={currentStep === "basic"}
              >
                Previous
              </Button>

              <Button
                onClick={() => {
                  const steps = ["basic", "questions", "schedule", "settings"]
                  const currentIndex = steps.indexOf(currentStep)
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1])
                  } else {
                    handleSaveExam()
                  }
                }}
              >
                {currentStep === "settings" ? "Create Exam" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
