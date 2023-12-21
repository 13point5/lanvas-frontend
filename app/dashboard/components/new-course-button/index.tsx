"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
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
import { FormStatus } from "@/app/types";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useCoursesApi } from "@/lib/api/courses";

const formSchema = z.object({
  title: z.string(),
});

export const NewCourseButton = () => {
  const dialogState = useBoolean();

  const { createCourse } = useCoursesApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);

    setFormStatus(FormStatus.Loading);

    try {
      const res = await createCourse(values);
      console.log("res", res);
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
      <Button variant="outline" onClick={dialogState.on}>
        <PlusIcon className="mr-2 h-4 w-4" />
        New Course
      </Button>

      <Dialog open={dialogState.value} onOpenChange={dialogState.setValue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Course</DialogTitle>
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
                      <Input placeholder="Course Title" {...field} />
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
