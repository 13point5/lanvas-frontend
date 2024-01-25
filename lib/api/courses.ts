import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";
import { Database } from "@/app/supabase.types";
import { CourseMemberRole } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateCoursePayload = {
  title: string;
};

const createCourse = (
  payload: CreateCoursePayload,
  axiosInstance: AxiosInstance
) => axiosInstance.post("/courses", payload);

type GetCoursePayload = {
  id: number;
};

const getCourse = (payload: GetCoursePayload, axiosInstance: AxiosInstance) =>
  axiosInstance.get(`/courses/${payload.id}`);

export type UserCourse = {
  role: CourseMemberRole;
  course: Database["public"]["Tables"]["courses"]["Row"];
};

const getUserCourses = (axiosInstance: AxiosInstance): Promise<UserCourse[]> =>
  axiosInstance.get("/courses").then((res) => res.data);

type DummyChatPayload = {
  courseId: number;
  body: {
    message: string;
  };
};

const dummyChat = (payload: DummyChatPayload, axiosInstance: AxiosInstance) =>
  axiosInstance.post(`/courses/${payload.courseId}/chat`, payload.body);

export const useCoursesApi = () => {
  const { axiosInstance } = useAxios();

  return {
    createCourse: (payload: CreateCoursePayload) =>
      createCourse(payload, axiosInstance),
    getCourse: (payload: GetCoursePayload) => getCourse(payload, axiosInstance),
    getUserCourses: () => getUserCourses(axiosInstance),

    dummyChat: (payload: DummyChatPayload) => dummyChat(payload, axiosInstance),
  };
};

const USER_COURSES_QUERY_KEY = ["userCourses"];

export const useCoursesQuery = () => {
  const { getUserCourses } = useCoursesApi();

  return useQuery({
    queryKey: USER_COURSES_QUERY_KEY,
    queryFn: getUserCourses,
  });
};

export const useCoursesMutation = () => {
  const { createCourse } = useCoursesApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      queryClient.setQueryData<UserCourse[]>(
        USER_COURSES_QUERY_KEY,
        (oldData = []) => {
          const newUserCourse = {
            role: CourseMemberRole.teacher,
            course: data.data,
          };

          if (!oldData) return [newUserCourse];

          return [...oldData, newUserCourse];
        }
      );
    },
  });
};
