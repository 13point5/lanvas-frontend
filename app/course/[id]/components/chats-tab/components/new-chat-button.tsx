import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBoolean } from "@/lib/hooks/useBoolean";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCreateCourseChatMutation } from "@/lib/hooks/api/courseChats";
import { CourseId } from "@/app/types";

const formSchema = z.object({
  title: z.string(),
});

type Props = {
  courseId: CourseId;
};

export const NewChatButton = ({ courseId }: Props) => {
  const dialogState = useBoolean();

  const mutation = useCreateCourseChatMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    mutation.mutate({
      courseId,
      title: values.title,
    });
    dialogState.off();
  };

  useEffect(() => {
    if (!dialogState.value) {
      form.reset();
    }
  }, [form, dialogState.value]);

  return (
    <>
      <Button
        onClick={dialogState.on}
        variant="ghost"
        className="w-full justify-start"
      >
        <PlusIcon className="mr-2 w-4 h-4" /> New Chat
      </Button>

      <Dialog open={dialogState.value} onOpenChange={dialogState.setValue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Chat</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Chat Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {false ? (
                    <>
                      <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
