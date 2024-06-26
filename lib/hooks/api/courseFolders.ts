import { CourseFolder } from "@/app/types";
import { useCourseFoldersApi } from "@/lib/api/courseFolders";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCourseFolderKey = (id: number) => [...getCourseKey(id), "folders"];

export const useCourseFoldersQuery = (courseId: number) => {
  const { getCourseFolders } = useCourseFoldersApi();

  return useQuery({
    queryKey: getCourseFolderKey(courseId),
    queryFn: () => getCourseFolders({ courseId }),
  });
};

export const useCreateCourseFolderMutation = () => {
  const { createCourseFolder } = useCourseFoldersApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseFolder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseFolder[]>(
        getCourseFolderKey(variables.courseId),
        (oldData = []) => {
          if (!oldData) return [data.data];

          return [...oldData, data.data];
        }
      );
    },
  });
};

export const useRenameCourseFolderMutation = () => {
  const { renameCourseFolder } = useCourseFoldersApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameCourseFolder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseFolder[]>(
        getCourseFolderKey(variables.courseId),
        (oldData = []) => {
          if (!oldData) return [data.data];

          return oldData.map((folder) =>
            folder.id === variables.id ? data.data : folder
          );
        }
      );
    },
  });
};

export const useMoveCourseFolderMutation = () => {
  const { moveCourseFolder } = useCourseFoldersApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveCourseFolder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseFolder[]>(
        getCourseFolderKey(variables.courseId),
        (oldData = []) => {
          if (!oldData) return [data.data];

          return oldData.map((folder) =>
            folder.id === variables.id ? data.data : folder
          );
        }
      );
    },
  });
};

export const useDeleteCourseFolderMutation = () => {
  const { deleteCourseFolder } = useCourseFoldersApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourseFolder,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseFolder[]>(
        getCourseFolderKey(variables.courseId),
        (oldData = []) => {
          if (!oldData) return [];

          return oldData.filter((folder) => folder.id !== variables.id);
        }
      );
    },
  });
};
