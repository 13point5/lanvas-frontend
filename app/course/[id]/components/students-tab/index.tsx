"use client";

import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { Button } from "@/components/ui/button";
import InviteStudentsDialog from "@/app/course/[id]/components/students-tab/invite-students-dialog";
import { useCourseMembersApi } from "@/lib/api/courseMembers";
import { DataTable } from "@/components/data-table";
import { AlertCircleIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { CourseMember } from "@/app/types";
import { Course } from "@/lib/api/courses";
import {
  useAddCourseMembersMutation,
  useCourseMembersQuery,
} from "@/lib/hooks/api/courseMembers";

const columns: ColumnDef<CourseMember>[] = [
  { header: "Email", accessorKey: "email" },
  { header: "Date Joined", accessorKey: "created_at" },
];

type Props = {
  courseId: Course["id"];
};

export default function StudentsTab({ courseId }: Props) {
  const membersQuery = useCourseMembersQuery(courseId);
  const addMembersMutation = useAddCourseMembersMutation(courseId);

  const inviteStudentsDialogState = useBoolean();

  const handleInviteStudents = (emails: string[]) => {
    addMembersMutation.mutate({
      courseId,
      members: emails.map((email) => ({ email, role: "student" })),
    });
  };

  if (membersQuery.isPending) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <Loader2Icon className="animate-spin" size={24} />
          <span className="text-lg">Fetching Members</span>
        </div>
      </div>
    );
  }

  if (membersQuery.isError) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 items-center justify-center rounded-md bg-red-100 p-2">
          <AlertCircleIcon size={24} className="text-red-500" />
          <span className="text-lg text-red-500">Error Fetching Courses</span>
        </div>
      </div>
    );
  }

  const students = membersQuery.data.filter(
    (member) => member.role === "student"
  );

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={inviteStudentsDialogState.on}
        variant="outline"
        className="w-fit"
      >
        <PlusIcon className="mr-2 w-4 h-4" />
        Invite Students
      </Button>

      <InviteStudentsDialog
        open={inviteStudentsDialogState.value}
        onOpenChange={inviteStudentsDialogState.setValue}
        handleSubmit={handleInviteStudents}
      />

      <DataTable columns={columns} data={students} />
    </div>
  );
}
