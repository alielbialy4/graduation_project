import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import showNotification from "@utils/notify";
import Cookies from "js-cookie";

type UseMutateProps<T> = {
  method?: "post" | "put" | "delete";
  endpoint: string;
  language?: string;
  formData?: boolean;
  mutationKey: any[];
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
  queryKeyToInvalidate?: readonly unknown[];
  onUploadProgress?: (progress: number) => void;
};

function useMutate<T>({
  method,
  endpoint,
  mutationKey,
  formData = false,
  onSuccess,
  onError,
  queryKeyToInvalidate,
  onUploadProgress,
}: UseMutateProps<T>) {
  const queryClient = useQueryClient();
  const token = Cookies.get("access_token");

  // @ts-expect-error: queryKeyToInvalidate type is unknown
  const { data, isSuccess, mutate, failureReason, isError, error, isLoading } =
    useMutation({
      mutationKey,
      mutationFn: async (data: T) => {
        const response = await axios({
          method: method || "post",
          url: `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
          data,
          headers: formData
            ? {
                "Content-Type": "multipart/form-data",
                "Accept-Language": "en",
                "Authorization": `Bearer ${token}`,
              }
            : {
                "Content-Type": "application/json; charset=utf-8",
                "Accept-Language": "en",
                "Authorization": `Bearer ${token}`,
              },
          onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onUploadProgress(progress);
            }
          },
        });
        return response.data;
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message;

        console.log(error);

        showNotification(errorMessage, "error");

        if (onError) {
          onError(error);
        }
      },
      onSuccess: (data) => {
        if (queryKeyToInvalidate) {
          // @ts-expect-error: queryKeyToInvalidate type is unknown
          queryClient.invalidateQueries(queryKeyToInvalidate);
        }
        if (onSuccess) {
          onSuccess(data);
        }
      },
    });

  return {
    data,
    isLoading,
    isSuccess,
    mutate,
    failureReason,
    isError,
    error,
  };
}

export default useMutate;
