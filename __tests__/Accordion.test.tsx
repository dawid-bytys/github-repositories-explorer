import { render, userEvent } from '@testing-library/react-native';
import { Accordion } from '@/components/Accordion/Accordion';
import { Colors } from '@/constants/colors';
import { Text } from 'react-native';

describe('Accordion', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('renders the title correctly', () => {
    const { getByText } = render(
      <Accordion title="Test Title">
        <Text>Test Content</Text>
      </Accordion>,
    );
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('starts collapsed', () => {
    const { queryByText } = render(
      <Accordion title="Test Title">
        <Text>Test Content</Text>
      </Accordion>,
    );
    expect(queryByText('Test Content')).toBeNull();
  });

  it('expands when pressed', async () => {
    const user = userEvent.setup();

    const { getByTestId, getByText } = render(
      <Accordion title="Test Title">
        <Text>Test Content</Text>
      </Accordion>,
    );
    const button = getByTestId('accordion-button');
    await user.press(button);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('collapses when pressed again', async () => {
    const user = userEvent.setup();

    const { getByTestId, queryByText } = render(
      <Accordion title="Test Title">
        <Text>Test Content</Text>
      </Accordion>,
    );
    const button = getByTestId('accordion-button');
    await user.press(button); // expand
    await user.press(button); // collapse
    expect(queryByText('Test Content')).toBeNull();
  });

  it('renders with light theme', () => {
    const { getByTestId } = render(
      <Accordion title="Test Title">
        <Text>Test Content</Text>
      </Accordion>,
    );
    const container = getByTestId('accordion');
    expect(container.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: Colors.light.accordionBackground }]),
    );
  });
});
