import { useAxios } from "@/lib/hooks/useAxios";
import { AxiosInstance } from "axios";
import { Database } from "@/app/supabase.types";
import { CourseMemberRole } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Course = Database["public"]["Tables"]["courses"]["Row"];

type GetCoursePayload = {
  id: number;
};

const getCourse = (
  payload: GetCoursePayload,
  axiosInstance: AxiosInstance
): Promise<Course> =>
  axiosInstance.get(`/courses/${payload.id}`).then((res) => res.data);

export type UserCourse = {
  role: CourseMemberRole;
  course: Course;
};

const getUserCourses = (axiosInstance: AxiosInstance): Promise<UserCourse[]> =>
  axiosInstance.get("/courses").then((res) => res.data);

type CreateCoursePayload = {
  title: string;
};

const createCourse = (
  payload: CreateCoursePayload,
  axiosInstance: AxiosInstance
) => axiosInstance.post("/courses", payload);

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

const getCourseKey = (id: number) => ["course", id];

export const useCourseQuery = (id: number) => {
  const { getCourse } = useCoursesApi();

  return useQuery({
    queryKey: getCourseKey(id),
    queryFn: () => getCourse({ id }),
  });
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
