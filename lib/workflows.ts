import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

// This is for sending message using email from RESEND API,
// Since i dont have domains i'll comment all code

// import { Client as QStashClient, resend } from "@upstash/qstash";
// const qstashClient = new QStashClient({
//   token: config.env.upstash.qstashToken,
// });

// export const sendEmail = async ({
//   email,
//   subject,
//   message,
// }: {
//   email: string;
//   subject: string;
//   message: string;
// }) => {
//   await qstashClient.publishJSON({
//     api: {
//       name: "email",
//       provider: resend({ token: config.env.resendToken }),
//     },
//     body: {
// make email proffessional in hostinger or other email provider for example contact@bookplatform.com
//       from: "Admin Book Platform <contact@bookplatform.com>",
//       to: [email],
//       subject,
//       html: message,
//     },
//   });
// };
