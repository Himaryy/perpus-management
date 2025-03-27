import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

const MyProfile = async () => {
  const latestBook = (await db
    .select()
    .from(books)
    .limit(20)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList
        title="Latest Books"
        books={latestBook}
        containerClassName="mt-28"
      />
    </>
  );
};

export default MyProfile;
