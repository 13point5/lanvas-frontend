import { useCourseMembersApi, CourseMember } from "@/lib/api/courseMembers";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCourseMembersKey = (id: number) => [...getCourseKey(id), "members"];

export const useCourseMembersQuery = (courseId: number) => {
  const { getCourseMembers } = useCourseMembersApi();

  return useQuery({
    queryKey: getCourseMembersKey(courseId),
    queryFn: () => getCourseMembers({ courseId }),
  });
};

export const useAddCourseMembersMutation = (courseId: number) => {
  const { addCourseMembers } = useCourseMembersApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCourseMembers,
    onSuccess: (data) => {
      queryClient.setQueryData<CourseMember[]>(
        getCourseMembersKey(courseId),
        () => data
      );
    },
  });
};
