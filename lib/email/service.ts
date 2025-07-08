// import { Resend } from "resend"
// import type { ExamAnalysis } from "@/lib/ai/gemini"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export interface EmailTemplate {
//   to: string
//   subject: string
//   html: string
// }

// export interface ExamResultData {
//   studentName: string
//   studentEmail: string
//   examTitle: string
//   score: number
//   grade: string
//   completedDate: string
//   analysis: ExamAnalysis
//   certificateUrl?: string
// }

// export class EmailService {
//   async sendExamResults(data: ExamResultData): Promise<boolean> {
//     try {
//       const html = this.generateResultsHTML(data)

//       const email = await resend.emails.send({
//         from: "Smart CBT <noreply@smartcbt.com>",
//         to: data.studentEmail,
//         subject: `Exam Results: ${data.examTitle} - ${data.grade}`,
//         html,
//       })

//       console.log("Email sent successfully:", email.id)
//       return true
//     } catch (error) {
//       console.error("Failed to send email:", error)
//       return false
//     }
//   }

//   async sendExamReminder(
//     studentEmail: string,
//     studentName: string,
//     examTitle: string,
//     examDate: string,
//     examTime: string,
//   ): Promise<boolean> {
//     try {
//       const html = this.generateReminderHTML(studentName, examTitle, examDate, examTime)

//       const emailResponse = await resend.emails.send({
//         from: "Smart CBT <noreply@smartcbt.com>",
//         to: studentEmail,
//         subject: `Exam Reminder: ${examTitle} - ${examDate}`,
//         html,
//       })

//       console.log("Reminder email sent successfully:", emailResponse.id)
//       return true
//     } catch (error) {
//       console.error("Failed to send reminder email:", error)
//       return false
//     }
//   }

//   async sendBulkNotifications(emails: EmailTemplate[]): Promise<{ sent: number; failed: number }> {
//     let sent = 0
//     let failed = 0

//     for (const email of emails) {
//       try {
//         await resend.emails.send({
//           from: "Smart CBT <noreply@smartcbt.com>",
//           to: email.to,
//           subject: email.subject,
//           html: email.html,
//         })
//         sent++
//       } catch (error) {
//         console.error(`Failed to send email to ${email.to}:`, error)
//         failed++
//       }
//     }

//     return { sent, failed }
//   }

//   private generateResultsHTML(data: ExamResultData): string {
//     const { studentName, examTitle, score, grade, completedDate, analysis } = data

//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Exam Results - ${examTitle}</title>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
//             .score-card { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//             .score { font-size: 48px; font-weight: bold; color: ${score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}; }
//             .grade { font-size: 24px; font-weight: bold; margin-top: 10px; }
//             .subject-breakdown { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
//             .subject-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
//             .progress-bar { width: 100px; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
//             .progress-fill { height: 100%; background: #3b82f6; transition: width 0.3s ease; }
//             .recommendations { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 10px; margin: 20px 0; }
//             .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
//             .btn { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🎓 Exam Results</h1>
//               <h2>${examTitle}</h2>
//               <p>Completed on ${completedDate}</p>
//             </div>
            
//             <div class="content">
//               <p>Dear ${studentName},</p>
//               <p>Your exam results are now available. Here's a comprehensive breakdown of your performance:</p>
              
//               <div class="score-card">
//                 <div class="score">${score}%</div>
//                 <div class="grade">Grade: ${grade}</div>
//                 <p>${analysis.correctAnswers} out of ${analysis.totalQuestions} questions correct</p>
//               </div>

//               <div class="subject-breakdown">
//                 <h3>📊 Subject-wise Performance</h3>
//                 ${Object.entries(analysis.subjectBreakdown)
//                   .map(
//                     ([subject, data]) => `
//                   <div class="subject-item">
//                     <div>
//                       <strong>${subject}</strong>
//                       <br><small>${data.correct}/${data.total} correct</small>
//                     </div>
//                     <div style="text-align: right;">
//                       <div class="progress-bar">
//                         <div class="progress-fill" style="width: ${data.percentage}%;"></div>
//                       </div>
//                       <strong>${data.percentage}%</strong>
//                     </div>
//                   </div>
//                 `,
//                   )
//                   .join("")}
//               </div>

//               ${
//                 analysis.weakAreas.length > 0
//                   ? `
//                 <div class="recommendations">
//                   <h3>💡 Areas for Improvement</h3>
//                   <ul>
//                     ${analysis.weakAreas.map((area) => `<li>${area}</li>`).join("")}
//                   </ul>
//                 </div>
//               `
//                   : ""
//               }

//               ${
//                 analysis.recommendations.length > 0
//                   ? `
//                 <div class="recommendations">
//                   <h3>📚 AI Recommendations</h3>
//                   <ul>
//                     ${analysis.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
//                   </ul>
//                 </div>
//               `
//                   : ""
//               }

//               ${
//                 analysis.timeAnalysis
//                   ? `
//                 <div class="subject-breakdown">
//                   <h3>⏱️ Time Analysis</h3>
//                   <p><strong>Total Time:</strong> ${analysis.timeAnalysis.totalTime} minutes</p>
//                   <p><strong>Average per Question:</strong> ${analysis.timeAnalysis.averageTimePerQuestion.toFixed(1)} minutes</p>
//                   <p><strong>Efficiency:</strong> ${analysis.timeAnalysis.efficiency}</p>
//                 </div>
//               `
//                   : ""
//               }

//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="https://smartcbt.com/student/results" class="btn">View Detailed Results</a>
//               </div>
//             </div>

//             <div class="footer">
//               <p>This is an automated message from Smart CBT Platform</p>
//               <p>© 2024 Smart CBT. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   }

//   private generateReminderHTML(studentName: string, examTitle: string, examDate: string, examTime: string): string {
//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Exam Reminder - ${examTitle}</title>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
//             .exam-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//             .detail-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
//             .btn { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
//             .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>⏰ Exam Reminder</h1>
//               <h2>${examTitle}</h2>
//             </div>
            
//             <div class="content">
//               <p>Dear ${studentName},</p>
//               <p>This is a friendly reminder about your upcoming examination:</p>
              
//               <div class="exam-details">
//                 <div class="detail-item">
//                   <strong>Exam:</strong>
//                   <span>${examTitle}</span>
//                 </div>
//                 <div class="detail-item">
//                   <strong>Date:</strong>
//                   <span>${examDate}</span>
//                 </div>
//                 <div class="detail-item">
//                   <strong>Time:</strong>
//                   <span>${examTime}</span>
//                 </div>
//               </div>

//               <p><strong>Important Reminders:</strong></p>
//               <ul>
//                 <li>Log in 15 minutes before the exam starts</li>
//                 <li>Ensure stable internet connection</li>
//                 <li>Have your ID ready for verification</li>
//                 <li>Use a quiet, well-lit environment</li>
//               </ul>

//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="https://smartcbt.com/student/exams" class="btn">Access Exam Portal</a>
//               </div>
//             </div>

//             <div class="footer">
//               <p>Good luck with your examination!</p>
//               <p>© 2024 Smart CBT. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   }
// }

// export const emailService = new EmailService()
