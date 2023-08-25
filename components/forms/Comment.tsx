"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
// import { updateUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";


interface Props{
    threadId: string
    currentUserImg: string
    currentUserId: string
}


const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: "",
      },
    });
  
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(
        threadId, values.thread,JSON.parse(currentUserId), pathname
      );
      form.reset()
    };
    return (
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="comment-form"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel>
                  <Image 
                    src={currentUserImg}
                    alt="Profile image"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="text-light-1 outline-none no-focus bg-dark-3"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    )
}


export default Comment