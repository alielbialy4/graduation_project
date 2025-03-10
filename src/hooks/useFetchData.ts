import axios from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import showNotification from "@utils/notify";

type UseFetchProps<T> = {
  queryKey: any;
  endpoint: string;
  enabled?: boolean;
  select?: (data: any) => T;
  onError?: (err: any) => void;
  onSuccess?: (data: T) => void;
  language?: boolean;
};

function useFetch<T>({
  queryKey,
  endpoint,
  enabled = true,
  select,
  onError,
  onSuccess,
}: UseFetchProps<T>) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const config = {
    headers: {
      "Accept-Language": "en",
    },
  };


  const queryOptions: UseQueryOptions<T, any> = {
    queryKey,
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseURL}/${endpoint}`, config);
        return response.data;
      } catch (err: any) {
        throw err;
      }
    },
    enabled,
    select,
    // @ts-expect-error - Fix this later
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "error";
      
      showNotification(errorMessage, "error");
      
      if (onError) {
        onError(error);
      }
    },
    onSuccess: (data: any) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    retry: 1,
  };

  const query = useQuery<T>(queryOptions);

  return query;
}

export default useFetch;
