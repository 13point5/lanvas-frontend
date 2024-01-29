import {
  CourseMaterial,
  useCourseMaterialsApi,
} from "@/lib/api/courseMaterials";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCourseMaterialKey = (id: number) => [...getCourseKey(id), "materials"];

export const useCourseMaterialsQuery = (courseId: number) => {
  const { getCourseMaterials } = useCourseMaterialsApi();

  return useQuery({
    queryKey: getCourseMaterialKey(courseId),
    queryFn: () => getCourseMaterials({ courseId }),
  });
};

export const useRenameCourseMaterialMutation = () => {
  const { renameCourseMaterial } = useCourseMaterialsApi();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameCourseMaterial,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<CourseMaterial[]>(
        getCourseMaterialKey(variables.courseId),
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
