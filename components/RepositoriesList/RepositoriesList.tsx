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
  const { data, error, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchRepositoriesQuery(username);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<RepositoriesResponse>) => {
    return (
      <RepositoryTile
        title={item.name}
        description={item.description}
        stars={item.stargazers_count}
        url={item.html_url}
      />
    );
  }, []);

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
    if (isError) {
      Toast.show(error.message, {
        position: Toast.positions.TOP,
      });
    }
  }, [isError, error]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultsInfo title="An error occurred. 😵" titleStyle={styles.info} />;
  }

  if (data.pages[0].length === 0) {
    return <ResultsInfo title="No repositories found. 😢" titleStyle={styles.info} />;
  }

  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={data.pages.flatMap((page) => page)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      {renderFooter()}
    </>
  );
}
