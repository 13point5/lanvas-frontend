import { useCourseFoldersApi } from "@/lib/api/courseFolders";
import { getCourseKey } from "@/lib/hooks/api/courses";
import { useQuery } from "@tanstack/react-query";

const getCourseFolderKey = (id: number) => [...getCourseKey(id), "folders"];

export const useCourseFoldersQuery = (courseId: number) => {
  const { getCourseFolders } = useCourseFoldersApi();

  return useQuery({
    queryKey: getCourseFolderKey(courseId),
    queryFn: () => getCourseFolders({ courseId }),
  });
};
