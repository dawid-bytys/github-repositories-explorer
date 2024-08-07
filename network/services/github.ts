import { githubClient } from '../interceptors';
import type { RepositoriesResponse } from '../responses/repos';
import type { UsersResponse } from '../responses/users';

interface RepositoriesParams {
  username: string;
  pageParam: number;
}

export const GitHubService = {
  fetchUsers: async (query: string) => {
    const response = await githubClient.get<UsersResponse>(
      `https://api.github.com/search/users?q=${query}&per_page=5`,
    );
    return response.data;
  },

  fetchRepositories: async ({ username, pageParam }: RepositoriesParams) => {
    const response = await githubClient.get<RepositoriesResponse[]>(
      `https://api.github.com/users/${username}/repos?per_page=5&page=${pageParam}`,
    );
    return response.data;
  },
};
