import Toast from 'react-native-root-toast';
import { useCallback, useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useSearchRepositoriesQuery } from '@/network/queries/github';
import { Loading } from '../Loading/Loading';
import { ResultsInfo } from '../ResultsInfo/ResultsInfo';
import { RepositoriesResponse } from '@/network/responses/repos';
import { RepositoryTile } from '../RepositoryTile/RepositoryTile';
import { Button } from '../Button/Button';
import { styles } from './styles';
import type { ListRenderItemInfo } from 'react-native';
import type { RepositoriesListProps } from './types';

export function RepositoriesList({ username }: RepositoriesListProps) {
  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchRepositoriesQuery(username);

  const flattenedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return data.pages.flatMap((page) => page);
  }, [data]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<RepositoriesResponse>) => (
      <RepositoryTile
        title={item.name}
        description={item.description}
        stars={item.stargazers_count}
        url={item.html_url}
      />
    ),
    [],
  );

  // rendering footer separately (not using ListFooterComponent) because
  // there is some issue with extra space if ListFooterComponent is null/undefined
  const renderFooter = useCallback(() => {
    if (isFetchingNextPage || hasNextPage) {
      return (
        <View style={styles.footer}>
          {isFetchingNextPage ? (
            <Loading />
          ) : (
            <Button title="Load more" onPress={() => fetchNextPage()} />
          )}
        </View>
      );
    }

    return null;
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (error) {
      Toast.show(error.message, {
        position: Toast.positions.TOP,
      });
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ResultsInfo title="An error occurred. 😵" titleStyle={styles.info} />;
  }

  if (!error && flattenedData && flattenedData.length === 0) {
    return <ResultsInfo title="No repositories found. 😢" titleStyle={styles.info} />;
  }

  if (!error && flattenedData && flattenedData.length > 0) {
    return (
      <>
        <FlatList
          scrollEnabled={false}
          data={flattenedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 10 }}
        />
        {renderFooter()}
      </>
    );
  }

  return null;
}
