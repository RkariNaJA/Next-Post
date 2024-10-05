"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
//Pass formData as an argument automatically
// Get prevState automatically becasue passing createPost to the useFormState hook.
export async function createPost(prevState, formData) {
  //Extract data that was entered by the user
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let error = [];

  if (!title || title.trim().length === 0) {
    error.push("Title is required");
  }
  if (!content || content.trim().length === 0) {
    error.push("Content is required");
  }
  if (!image || image.size === 0) {
    error.push("Images is required");
  }
  if (error.length > 0) {
    return { error };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
}
export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout"); // Use when you are changing some data that shown on page
}
