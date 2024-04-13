"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { Button } from "@/components/ui/button";
import InviteStudentsDialog from "@/app/course/[id]/components/students-tab/invite-students-dialog";
import { DataTable } from "@/components/data-table";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { CourseMember } from "@/app/types";
import {
  useAddStudentsMutation,
  useCourseMembersQuery,
} from "@/lib/hooks/api/courseMembers";

const columns: ColumnDef<CourseMember>[] = [
  { header: "Email", accessorKey: "email" },
  { header: "Date Joined", accessorKey: "created_at" },
];

type Props = {
  courseId: number;
};

export default function StudentsTab({ courseId }: Props) {
  const membersQuery = useCourseMembersQuery(courseId);

  const addStudentsMutation = useAddStudentsMutation(courseId);

  const inviteStudentsDialogState = useBoolean();

  if (membersQuery.isPending) {
    return (
      <div className="flex items-center gap-2">
        <Loader2Icon className="w-6 h-6 animate-spin" />
        <span>Fetching Students</span>
      </div>
    );
  }

  if (membersQuery.isError) {
    return <span className="text-red-500">Error fetching students</span>;
  }

  const members: CourseMember[] = membersQuery.data || [];

  const students = members.filter((member) => member.role === "student");

  const handleInviteStudents = async (emails: string[]) => {
    await addStudentsMutation.mutateAsync({
      courseId,
      members: emails.map((email) => ({ email, role: "student" })),
    });
  };

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
