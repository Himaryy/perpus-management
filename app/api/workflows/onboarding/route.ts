import { serve } from "@upstash/workflow/nextjs";

// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
// import { eq } from "drizzle-orm";
// import { sendEmail } from "@/lib/workflows";

// type UserState = "non-active" | "active";
type InitialData = {
  email: string;
  // fullName: string;
};

// THIS IS DUMMY IF ALREADY HAVE DOMAINS JUST DELETE AND USING CONST ONEDAY and so on

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`);
}

type UserState = "non-active" | "active";

const getUserState = async (): Promise<UserState> => {
  // Implement user state logic here
  return "non-active";
};

// const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
// const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
// const THIRTHY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

// const getUserState = async (email: string): Promise<UserState> => {
//   const user = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, email))
//     .limit(1);

//   if (user.length === 0) return "non-active";

//   const lastActivityDate = new Date(user[0].lastActivityDate!);
//   const now = new Date();
//   const timeDifference = now.getTime() - lastActivityDate.getTime();

//   if (
//     timeDifference > THREE_DAYS_IN_MS &&
//     timeDifference <= THIRTHY_DAYS_IN_MS
//   ) {
//     return "non-active";
//   }

//   return "active";
// };

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload;

  await context.run("new-signup", async () => {
    // await sendEmail({
    // email,subject:"Welcome to the platform",message:`Welcome to the platform ${fullName}`
    // });
    await sendEmail("Welcome to the platform", email);
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState();
      // return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("Email to non-active users", email);
        // await sendEmail({
        // email,subject:'Are you still there?',message:`Hey ${fullName}, we haven't seen you in a while. Are you still interested in our platform?`
        // });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email);
        // await sendEmail({
        // email,subject:'Welcome Back',message:`Hey ${fullName}, we are glad to see you back on our platform.`
        // });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
