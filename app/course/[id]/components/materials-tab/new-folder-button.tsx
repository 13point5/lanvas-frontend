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
import { CourseFolder, FormStatus } from "@/app/types";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useCourseFoldersApi } from "@/lib/api/courseFolders";

const formSchema = z.object({
  name: z.string(),
});

type Props = {
  courseId: number;
  parentFolderId: number | null;
  onAddFolder: (data: CourseFolder) => void;
};

export const NewFolderButton = ({
  courseId,
  parentFolderId,
  onAddFolder,
}: Props) => {
  const dialogState = useBoolean();

  const { createCourseFolder } = useCourseFoldersApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);

    setFormStatus(FormStatus.Loading);

    try {
      const res = await createCourseFolder({
        courseId,
        parentFolderId,
        name: values.name,
      });
      console.log("res", res);
      onAddFolder(res.data);
      dialogState.off();
      setFormStatus(FormStatus.Success);
    } catch (error) {
      console.error(error);
      setFormStatus(FormStatus.Error);
    }
  };

  useEffect(() => {
    if (!dialogState.value) {
      form.reset();
      setFormStatus(FormStatus.Idle);
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
                  {formStatus === FormStatus.Loading ? (
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
