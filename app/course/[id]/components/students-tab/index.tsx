"use client";

import { Database } from "@/app/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { Button } from "@/components/ui/button";
import InviteStudentsDialog from "@/app/course/[id]/components/students-tab/invite-students-dialog";
import { useCoursesApi } from "@/lib/api/courses";
import { DataTable } from "@/app/course/[id]/components/students-tab/data-table";
import { PlusIcon } from "lucide-react";
import { CourseMember } from "@/app/types";

const columns: ColumnDef<CourseMember>[] = [
  { header: "Email", accessorKey: "email" },
  { header: "Join Date", accessorKey: "created_at" },
];

type Props = {
  members: CourseMember[];
  onUpdateMembers: (members: CourseMember[]) => void;
};

export default function StudentsTab({ members, onUpdateMembers }: Props) {
  const params = useParams();
  const courseId = Number(params.id);

  const students = members.filter((member) => member.role === "student");

  const coursesApi = useCoursesApi();

  const inviteStudentsDialogState = useBoolean();

  const handleInviteStudents = async (emails: string[]) => {
    const res = await coursesApi.addCourseMembers({
      courseId,
      members: emails.map((email) => ({ email, role: "student" })),
    });
    onUpdateMembers(res.data);
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
