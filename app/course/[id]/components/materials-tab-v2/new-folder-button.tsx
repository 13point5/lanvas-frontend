"use client";

import { Button } from "@/components/ui/button";
import { FolderPlusIcon, Loader2Icon, PlusIcon } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useCreateCourseFolderMutation } from "@/lib/hooks/api/courseFolders";

const formSchema = z.object({
  name: z.string(),
});

type Props = {
  courseId: number;
  parentFolderId: number | null;
};

export const NewFolderButton = ({ courseId, parentFolderId }: Props) => {
  const dialogState = useBoolean();

  const mutation = useCreateCourseFolderMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync({
      courseId,
      parentFolderId,
      name: values.name,
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
      <Button variant="outline" onClick={dialogState.on} size="sm">
        <FolderPlusIcon className="mr-2 h-4 w-4" />
        New Folder
      </Button>

      <Dialog open={dialogState.value} onOpenChange={dialogState.setValue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {mutation.isPending ? (
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
