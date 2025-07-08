// "use client"
// import { useState } from "react"
// import { BackgroundBeams } from "@/components/effects/background-beams"
// import { Button } from "@/components/effects/moving-border"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Progress } from "@/components/ui/progress"
// import {
//   Plus,
//   Search,
//   Filter,
//   BookOpen,
//   Upload,
//   Download,
//   ArrowLeft,
//   Eye,
//   Edit,
//   Trash2,
//   Brain,
//   FileText,
//   ImageIcon,
//   Video,
//   CheckCircle,
//   AlertTriangle,
//   Clock,
// } from "lucide-react"
// import Link from "next/link"
// import { SmartCBTLogo } from "@/components/smart-cbt-logo"

// export default function AdminContent() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterType, setFilterType] = useState("all")

//   const questionBanks = [
//     {
//       id: 1,
//       title: "JAMB Mathematics Question Bank 2024",
//       subject: "Mathematics",
//       questions: 500,
//       difficulty: "mixed",
//       status: "published",
//       createdBy: "Dr. Adebayo Johnson",
//       createdAt: "2024-01-10",
//       lastUpdated: "2024-01-15",
//       usage: 85,
//       aiProcessed: true,
//     },
//     {
//       id: 2,
//       title: "English Language Comprehension",
//       subject: "English",
//       questions: 300,
//       difficulty: "medium",
//       status: "draft",
//       createdBy: "Prof. Sarah Okafor",
//       createdAt: "2024-01-12",
//       lastUpdated: "2024-01-16",
//       usage: 0,
//       aiProcessed: false,
//     },
//     {
//       id: 3,
//       title: "Physics Mechanics and Thermodynamics",
//       subject: "Physics",
//       questions: 400,
//       difficulty: "hard",
//       status: "published",
//       createdBy: "Mr. Ibrahim Musa",
//       createdAt: "2024-01-08",
//       lastUpdated: "2024-01-14",
//       usage: 92,
//       aiProcessed: true,
//     },
//     {
//       id: 4,
//       title: "Chemistry Organic Compounds",
//       subject: "Chemistry",
//       questions: 250,
//       difficulty: "medium",
//       status: "review",
//       createdBy: "Mrs. Grace Okoro",
//       createdAt: "2024-01-14",
//       lastUpdated: "2024-01-16",
//       usage: 15,
//       aiProcessed: true,
//     },
//   ]

//   const mediaFiles = [
//     {
//       id: 1,
//       name: "Mathematics Diagrams Pack",
//       type: "image",
//       size: "15.2 MB",
//       files: 45,
//       uploadedBy: "Dr. Adebayo Johnson",
//       uploadedAt: "2024-01-10",
//       status: "processed",
//     },
//     {
//       id: 2,
//       name: "Physics Experiment Videos",
//       type: "video",
//       size: "234.5 MB",
//       files: 12,
//       uploadedBy: "Mr. Ibrahim Musa",
//       uploadedAt: "2024-01-12",
//       status: "processing",
//     },
//     {
//       id: 3,
//       name: "Chemistry Formula Sheets",
//       type: "document",
//       size: "8.7 MB",
//       files: 23,
//       uploadedBy: "Mrs. Grace Okoro",
//       uploadedAt: "2024-01-14",
//       status: "processed",
//     },
//   ]

//   const filteredQuestionBanks = questionBanks.filter((bank) => {
//     const matchesSearch =
//       bank.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bank.subject.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesFilter = filterType === "all" || bank.subject.toLowerCase() === filterType.toLowerCase()
//     return matchesSearch && matchesFilter
//   })

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "published":
//         return "default"
//       case "draft":
//         return "secondary"
//       case "review":
//         return "outline"
//       case "processing":
//         return "outline"
//       case "processed":
//         return "default"
//       default:
//         return "secondary"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "published":
//         return <CheckCircle className="w-4 h-4" />
//       case "draft":
//         return <Edit className="w-4 h-4" />
//       case "review":
//         return <AlertTriangle className="w-4 h-4" />
//       case "processing":
//         return <Clock className="w-4 h-4" />
//       case "processed":
//         return <CheckCircle className="w-4 h-4" />
//       default:
//         return <BookOpen className="w-4 h-4" />
//     }
//   }

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case "easy":
//         return "bg-green-900/20 text-green-400 border-green-800"
//       case "medium":
//         return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
//       case "hard":
//         return "bg-red-900/20 text-red-400 border-red-800"
//       case "mixed":
//         return "bg-blue-900/20 text-blue-400 border-blue-800"
//       default:
//         return "bg-neutral-800 text-neutral-400"
//     }
//   }

//   const getFileTypeIcon = (type: string) => {
//     switch (type) {
//       case "image":
//         return <ImageIcon className="w-5 h-5 text-blue-400" />
//       case "video":
//         return <Video className="w-5 h-5 text-purple-400" />
//       case "document":
//         return <FileText className="w-5 h-5 text-green-400" />
//       default:
//         return <FileText className="w-5 h-5 text-neutral-400" />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
//       <BackgroundBeams />

//       {/* Header */}
//       <header className="bg-neutral-900/80 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-xl">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Button borderRadius="1rem" className="bg-transparent text-white border-slate-800" as={Link} href="/admin">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </Button>
//             <div className="h-6 w-px bg-neutral-700 mx-2" />
//             <SmartCBTLogo className="w-8 h-8" />
//             <div>
//               <h1 className="text-xl font-bold text-white">Smart CBT</h1>
//               <p className="text-xs text-neutral-400">Content Management</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Button
//               borderRadius="1rem"
//               className="bg-transparent text-white border-slate-800"
//               as={Link}
//               href="/admin/upload"
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Upload Content
//             </Button>
//             <Button
//               borderRadius="1rem"
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
//               as={Link}
//               href="/admin/content/create"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Create Question Bank
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
//             Content Management
//           </h1>
//           <p className="text-neutral-400 text-lg">Manage question banks, media files, and educational content</p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-400">Question Banks</p>
//                   <p className="text-2xl font-bold text-white">{questionBanks.length}</p>
//                 </div>
//                 <BookOpen className="w-8 h-8 text-blue-400" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-400">Total Questions</p>
//                   <p className="text-2xl font-bold text-white">
//                     {questionBanks.reduce((sum, bank) => sum + bank.questions, 0).toLocaleString()}
//                   </p>
//                 </div>
//                 <FileText className="w-8 h-8 text-green-400" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-400">AI Processed</p>
//                   <p className="text-2xl font-bold text-white">
//                     {questionBanks.filter((bank) => bank.aiProcessed).length}
//                   </p>
//                 </div>
//                 <Brain className="w-8 h-8 text-purple-400" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-neutral-400">Media Files</p>
//                   <p className="text-2xl font-bold text-white">{mediaFiles.length}</p>
//                 </div>
//                 <ImageIcon className="w-8 h-8 text-orange-400" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs defaultValue="question-banks" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3 bg-neutral-800 border-neutral-700">
//             <TabsTrigger
//               value="question-banks"
//               className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
//             >
//               Question Banks
//             </TabsTrigger>
//             <TabsTrigger
//               value="media-files"
//               className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
//             >
//               Media Files
//             </TabsTrigger>
//             <TabsTrigger
//               value="ai-processing"
//               className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
//             >
//               AI Processing
//             </TabsTrigger>
//           </TabsList>

//           {/* Question Banks Tab */}
//           <TabsContent value="question-banks" className="space-y-6">
//             {/* Filters and Search */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search question banks..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-400"
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Filter className="w-4 h-4 text-neutral-400" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white"
//                 >
//                   <option value="all">All Subjects</option>
//                   <option value="mathematics">Mathematics</option>
//                   <option value="english">English</option>
//                   <option value="physics">Physics</option>
//                   <option value="chemistry">Chemistry</option>
//                 </select>
//               </div>
//               <Button borderRadius="0.5rem" className="bg-transparent text-white border-slate-800">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export
//               </Button>
//             </div>

//             {/* Question Banks List */}
//             <div className="space-y-6">
//               {filteredQuestionBanks.map((bank) => (
//                 <Card
//                   key={bank.id}
//                   className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
//                 >
//                   <CardHeader>
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-3 mb-2">
//                           <CardTitle className="text-lg text-white">{bank.title}</CardTitle>
//                           <Badge variant={getStatusColor(bank.status)} className="flex items-center space-x-1">
//                             {getStatusIcon(bank.status)}
//                             <span className="capitalize">{bank.status}</span>
//                           </Badge>
//                           {bank.aiProcessed && (
//                             <Badge className="bg-purple-900/20 text-purple-400 border-purple-800">
//                               <Brain className="w-3 h-3 mr-1" />
//                               AI Processed
//                             </Badge>
//                           )}
//                         </div>
//                         <CardDescription className="text-neutral-400">
//                           {bank.subject} • {bank.questions} questions • Created by {bank.createdBy}
//                         </CardDescription>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                       <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
//                         <div className="text-lg font-semibold text-blue-400">{bank.questions}</div>
//                         <div className="text-xs text-neutral-400">Questions</div>
//                       </div>
//                       <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
//                         <div
//                           className={`text-lg font-semibold px-2 py-1 rounded text-xs ${getDifficultyColor(bank.difficulty)}`}
//                         >
//                           {bank.difficulty}
//                         </div>
//                         <div className="text-xs text-neutral-400 mt-1">Difficulty</div>
//                       </div>
//                       <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
//                         <div className="text-lg font-semibold text-green-400">{bank.usage}%</div>
//                         <div className="text-xs text-neutral-400">Usage Rate</div>
//                       </div>
//                       <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
//                         <div className="text-lg font-semibold text-purple-400">
//                           {new Date(bank.lastUpdated).toLocaleDateString()}
//                         </div>
//                         <div className="text-xs text-neutral-400">Last Updated</div>
//                       </div>
//                     </div>

//                     <div className="space-y-2 mb-4">
//                       <div className="flex justify-between text-sm text-neutral-300">
//                         <span>Usage in Exams</span>
//                         <span>{bank.usage}%</span>
//                       </div>
//                       <Progress value={bank.usage} className="h-2 bg-neutral-800" />
//                     </div>

//                     <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-800">
//                       <Button
//                         borderRadius="0.5rem"
//                         className="bg-transparent text-white border-slate-800"
//                         as={Link}
//                         href={`/admin/content/${bank.id}`}
//                       >
//                         <Eye className="w-4 h-4 mr-2" />
//                         View Questions
//                       </Button>
//                       <Button
//                         borderRadius="0.5rem"
//                         className="bg-transparent text-white border-slate-800"
//                         as={Link}
//                         href={`/admin/content/${bank.id}/edit`}
//                       >
//                         <Edit className="w-4 h-4 mr-2" />
//                         Edit
//                       </Button>
//                       {bank.status === "draft" && (
//                         <Button borderRadius="0.5rem" className="bg-blue-600 text-white border-0">
//                           <CheckCircle className="w-4 h-4 mr-2" />
//                           Publish
//                         </Button>
//                       )}
//                       <Button borderRadius="0.5rem" className="bg-red-600 text-white border-0">
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Delete
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Media Files Tab */}
//           <TabsContent value="media-files" className="space-y-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {mediaFiles.map((file) => (
//                 <Card
//                   key={file.id}
//                   className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl hover:bg-neutral-900/70 transition-all duration-300"
//                 >
//                   <CardHeader>
//                     <div className="flex items-center space-x-3">
//                       {getFileTypeIcon(file.type)}
//                       <div className="flex-1">
//                         <CardTitle className="text-base text-white">{file.name}</CardTitle>
//                         <CardDescription className="text-neutral-400">
//                           {file.files} files • {file.size}
//                         </CardDescription>
//                       </div>
//                       <Badge variant={getStatusColor(file.status)} className="flex items-center space-x-1">
//                         {getStatusIcon(file.status)}
//                         <span className="capitalize">{file.status}</span>
//                       </Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Uploaded by:</span>
//                         <span className="text-neutral-300">{file.uploadedBy}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Upload date:</span>
//                         <span className="text-neutral-300">{new Date(file.uploadedAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                     <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-neutral-800">
//                       <Button borderRadius="0.5rem" className="bg-transparent text-white border-slate-800">
//                         <Eye className="w-4 h-4 mr-2" />
//                         Preview
//                       </Button>
//                       <Button borderRadius="0.5rem" className="bg-transparent text-white border-slate-800">
//                         <Download className="w-4 h-4 mr-2" />
//                         Download
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* AI Processing Tab */}
//           <TabsContent value="ai-processing" className="space-y-6">
//             <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 text-white">
//                   <Brain className="w-6 h-6 text-purple-400" />
//                   <span>AI Content Processing</span>
//                 </CardTitle>
//                 <CardDescription className="text-neutral-400">
//                   Gemini AI automatically processes and enhances your content
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <h4 className="font-medium text-white">Processing Capabilities</h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-400" />
//                         <span className="text-neutral-300">Extract questions from PDF/DOCX files</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-400" />
//                         <span className="text-neutral-300">Format questions into MCQ structure</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-400" />
//                         <span className="text-neutral-300">Generate explanations and feedback</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-400" />
//                         <span className="text-neutral-300">Detect and flag ambiguous questions</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-400" />
//                         <span className="text-neutral-300">Categorize by difficulty and subject</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     <h4 className="font-medium text-white">Processing Statistics</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Files Processed Today:</span>
//                         <span className="text-white font-medium">23</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Questions Extracted:</span>
//                         <span className="text-white font-medium">1,247</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Success Rate:</span>
//                         <span className="text-green-400 font-medium">98.5%</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-neutral-400">Average Processing Time:</span>
//                         <span className="text-white font-medium">2.3 minutes</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t border-neutral-800">
//                   <Button
//                     borderRadius="1rem"
//                     className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
//                     as={Link}
//                     href="/admin/upload"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Upload Files for AI Processing
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }
