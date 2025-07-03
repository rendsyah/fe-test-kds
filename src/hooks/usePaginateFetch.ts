import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Meta } from '@/types/commons.types';

type UsePaginateFetchProps<T> = {
  key: string;
  queryFn: (query: {
    page: number;
    limit: number;
    search?: string;
    extraQuery?: Record<string, string | number>;
  }) => Promise<{ items: T[]; meta: Meta }>;
  extraQuery?: Record<string, string | number>;
};

export const usePaginatedFetch = <T>(props: UsePaginateFetchProps<T>) => {
  const { key, queryFn, extraQuery } = props;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPage: 0,
  });

  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
        setMeta((prev) => ({ ...prev, page: 1 }));
      }, 500),
    [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const queryKey = [
    key,
    meta.page,
    meta.limit,
    debouncedSearch,
    ...(extraQuery ? Object.values(extraQuery) : []),
  ];

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await queryFn({
        page: meta.page,
        limit: meta.limit,
        search: debouncedSearch || undefined,
        extraQuery,
      });

      setMeta(result.meta);
      return result.items;
    },
    placeholderData: (prev) => prev,
  });

  return {
    isLoading,
    isFetching,
    data: data ?? [],
    error: error?.message ?? '',
    search,
    meta,
    setMeta,
    onSearch,
    onRetry: () => refetch(),
  };
};
