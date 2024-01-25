"use client";

import { CourseFolder, CourseMaterial, FormStatus } from "@/app/types";
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
import { useCourseMaterialsApi } from "@/lib/api/courseMaterials";

const formSchema = z.object({
  name: z.string(),
});

type Props = {
  courseId: number;
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onSuccess: (material: CourseMaterial) => void;
};

const RenameMaterialDialog = ({
  id,
  courseId,
  open,
  onOpenChange,
  name,
  onSuccess,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.Idle);

  const { renameCourseMaterial } = useCourseMaterialsApi();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);

    setFormStatus(FormStatus.Loading);

    try {
      const res = await renameCourseMaterial({
        courseId,
        id,
        name: values.name,
      });
      console.log("res", res);
      onSuccess(res.data);
      onOpenChange(false);
      setFormStatus(FormStatus.Success);
    } catch (error) {
      console.error(error);
      setFormStatus(FormStatus.Error);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setFormStatus(FormStatus.Idle);
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Material</DialogTitle>
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

export default RenameMaterialDialog;
