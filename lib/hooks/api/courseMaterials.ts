import { useCourseMaterialsApi } from "@/lib/api/courseMaterials";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useQuery } from "@tanstack/react-query";

const getCourseMaterialKey = (id: number) => [...getCourseKey(id), "materials"];

export const useCourseMaterialsQuery = (courseId: number) => {
  const { getCourseMaterials } = useCourseMaterialsApi();

  return useQuery({
    queryKey: getCourseMaterialKey(courseId),
    queryFn: () => getCourseMaterials({ courseId }),
  });
};
