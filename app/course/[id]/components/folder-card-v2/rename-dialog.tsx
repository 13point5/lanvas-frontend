"use client";

import { Course, CourseFolder } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useRenameCourseFolderMutation } from "@/lib/hooks/api/courseFolders";

const formSchema = z.object({
  name: z.string(),
});

type Props = {
  id: CourseFolder["id"];
  name: CourseFolder["name"];
  courseId: Course["id"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RenameFolderDialog = ({
  id,
  courseId,
  open,
  onOpenChange,
  name,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const mutation = useRenameCourseFolderMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);

    await mutation.mutateAsync({
      courseId,
      id,
      name: values.name,
    });

    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
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
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFolderDialog;
