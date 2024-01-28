import { CourseMemberRole } from "@/app/types";
import { UserCourse, useCoursesApi } from "@/lib/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ROOT_QUERY_KEY = ["courses"];

export const useCoursesQuery = () => {
  const { getUserCourses } = useCoursesApi();

  return useQuery({
    queryKey: ROOT_QUERY_KEY,
    queryFn: getUserCourses,
  });
};

export const useCoursesMutation = () => {
  const { createCourse } = useCoursesApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      queryClient.setQueryData<UserCourse[]>(ROOT_QUERY_KEY, (oldData = []) => {
        const newUserCourse = {
          role: CourseMemberRole.teacher,
          course: data.data,
        };

        if (!oldData) return [newUserCourse];

        return [...oldData, newUserCourse];
      });
    },
  });
};

export const getCourseKey = (id: number) => [ROOT_QUERY_KEY, id];

export const useCourseQuery = (id: number) => {
  const { getUserCourse } = useCoursesApi();

  return useQuery({
    queryKey: getCourseKey(id),
    queryFn: () => getUserCourse({ id }),
  });
};
