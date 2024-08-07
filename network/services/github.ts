import { githubClient } from '../interceptors';
import type { RepositoriesResponse } from '../responses/repos';
import type { UsersResponse } from '../responses/users';

const BASE_URL = 'https://api.github.com';

interface RepositoriesParams {
  username: string;
  pageParam: number;
}

export const GitHubService = {
  fetchUsers: async (query: string) => {
    const response = await githubClient.get<UsersResponse>(
      `${BASE_URL}/search/users?q=${query}&per_page=5`,
    );
    return response.data;
  },

  fetchRepositories: async ({ username, pageParam }: RepositoriesParams) => {
    const response = await githubClient.get<RepositoriesResponse[]>(
      `${BASE_URL}/users/${username}/repos?per_page=5&page=${pageParam}`,
    );
    return response.data;
  },
};
