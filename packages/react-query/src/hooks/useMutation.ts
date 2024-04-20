import * as React from "react";
type MutationOptions = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

export function useMutation<T, Args extends any[]>(
  fun: (...args: Args) => Promise<T>,
  { onSuccess, onFailure }: MutationOptions,
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const mutate = React.useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      try {
        const result = await fun(...args);
        setData(result);
        setError(null);
        onSuccess?.();
        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
        onFailure?.();
      } finally {
        setIsLoading(false);
      }
    },
    [fun, onFailure, onSuccess],
  );
  return { isLoading, data, error, mutate };
}
