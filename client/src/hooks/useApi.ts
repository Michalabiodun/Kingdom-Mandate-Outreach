import { useState, useEffect, useCallback } from 'react';

// Generic API hook for data fetching
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  apiFunction: (page: number, limit: number) => Promise<{ data: T[]; pagination: any }>,
  initialPage: number = 1,
  initialLimit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [pagination, setPagination] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(page, limit);
      setData(result.data);
      setPagination(result.pagination);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (pagination?.hasNext) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (pagination?.hasPrev) {
      setPage(page - 1);
    }
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page
  };

  return {
    data,
    loading,
    error,
    page,
    limit,
    pagination,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    refetch: fetchData
  };
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<T, P = any>(
  mutationFunction: (params: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFunction(params);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}
