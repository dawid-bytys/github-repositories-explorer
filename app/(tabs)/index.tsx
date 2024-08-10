import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { ThemedInput } from '@/components/ThemedInput/ThemedInput';
import { useSearchUsersQuery } from '@/network/queries/github';
import { Button } from '@/components/Button/Button';
import { ThemedContainer } from '@/components/ThemedContainer/ThemedContainer';
import { ThemedText } from '@/components/ThemedText/ThemedText';
import { Accordion } from '@/components/Accordion/Accordion';
import { Loading } from '@/components/Loading/Loading';
import { ResultsInfo } from '@/components/ResultsInfo/ResultsInfo';
import { RepositoriesList } from '@/components/RepositoriesList/RepositoriesList';
import { useBoundStore } from '@/store/store';

const initialValues = {
  username: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});

export default function HomeScreen() {
  const theme = useBoundStore((state) => state.theme);
  const [query, setQuery] = useState('');
  const [whichFocused, setWhichFocused] = useState<string | null>(null);
  const { data, error, isError, isFetching } = useSearchUsersQuery(query);

  const renderResults = useCallback(() => {
    if (isFetching) {
      return <Loading />;
    }

    if (isError) {
      return <ResultsInfo title="An error occurred. 😵" />;
    }

    if (data && data.items.length === 0) {
      return <ResultsInfo title="No users found. 😢" />;
    }

    if (data && data.items.length > 0) {
      // using map here because there are only 5 items
      return (
        <View style={styles.resultsContainer}>
          <ThemedText>Showing users for "{query}"</ThemedText>
          {data.items.map((user) => (
            <Accordion key={user.id} title={user.login}>
              <RepositoriesList username={user.login} />
            </Accordion>
          ))}
        </View>
      );
    }

    return <ResultsInfo title="Are you looking for someone? 🧐" />;
  }, [data, isError, isFetching, query]);

  useEffect(() => {
    if (isError) {
      Toast.show(error.message, {
        position: Toast.positions.TOP,
      });
    }
  }, [error, isError]);

  return (
    <ThemedContainer>
      <ScrollView
        indicatorStyle={theme === 'dark' ? 'white' : 'black'}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={({ username }) => setQuery(username)}>
          {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
            <View style={styles.formContainer}>
              <ThemedInput
                editable={!isFetching}
                focused={whichFocused === 'username'}
                value={values.username}
                error={errors.username}
                placeholder="Enter username"
                onFocus={() => setWhichFocused('username')}
                onBlur={() => {
                  handleBlur('username');
                  setWhichFocused(null);
                }}
                onChangeText={handleChange('username')}
              />
              <Button title="Search" onPress={() => handleSubmit()} disabled={isFetching} />
            </View>
          )}
        </Formik>
        {renderResults()}
      </ScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    padding: 25,
  },
  formContainer: {
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    marginTop: 10,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },
  listContainer: {
    gap: 10,
  },
});
