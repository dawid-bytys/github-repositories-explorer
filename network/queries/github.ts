import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { GitHubService } from '../services/github';
import { FIVE_MINUTES } from '@/constants/times';

export function useSearchUsersQuery(query: string) {
  return useQuery({
    queryKey: ['searchUsers', query],
    queryFn: () => GitHubService.fetchUsers(query),
    staleTime: FIVE_MINUTES,
    gcTime: Infinity,
    enabled: !!query,
  });
}

export function useSearchRepositoriesQuery(username: string) {
  return useInfiniteQuery({
    queryKey: ['searchRepositories', username],
    queryFn: ({ pageParam }) => GitHubService.fetchRepositories({ username, pageParam }),
    staleTime: FIVE_MINUTES,
    gcTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
}
