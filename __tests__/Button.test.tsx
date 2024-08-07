import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/Button/Button';
import { BLUE, WHITE } from '@/constants/colors';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<Button title="Press Me" />);
    const buttonText = getByText('Press Me');
    const button = getByTestId('button');

    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style).toEqual(expect.arrayContaining([{ color: WHITE }]));
    expect(button.props.style).toHaveProperty('backgroundColor', BLUE);
  });

  it('renders with custom props', () => {
    const customColor = 'red';
    const customTitleColor = 'yellow';
    const { getByText, getByTestId } = render(
      <Button title="Click Me" color={customColor} titleColor={customTitleColor} />,
    );
    const buttonText = getByText('Click Me');
    const button = getByTestId('button');

    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style).toEqual(expect.arrayContaining([{ color: customTitleColor }]));
    expect(button.props.style).toHaveProperty('backgroundColor', customColor);
  });

  it('applies styles from props', () => {
    const customStyle = { padding: 20 };
    const customTitleStyle = { fontSize: 18 };
    const { getByText, getByTestId } = render(
      <Button title="Styled Button" style={customStyle} titleStyle={customTitleStyle} />,
    );
    const buttonText = getByText('Styled Button');
    const button = getByTestId('button');

    expect(buttonText.props.style).toEqual(expect.arrayContaining([customTitleStyle]));
    expect(button.props.style).toHaveProperty('padding', 20);
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button title="Pressable" onPress={onPressMock} />);
    const button = getByTestId('button');

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('uses default colors if not provided', () => {
    const { getByText, getByTestId } = render(<Button title="Default Colors" />);
    const buttonText = getByText('Default Colors');
    const button = getByTestId('button');

    expect(buttonText.props.style).toEqual(expect.arrayContaining([{ color: WHITE }]));
    expect(button.props.style).toHaveProperty('backgroundColor', BLUE);
  });

  it('uses custom colors if provided', () => {
    const customColor = 'green';
    const customTitleColor = 'black';
    const { getByText, getByTestId } = render(
      <Button title="Custom Colors" color={customColor} titleColor={customTitleColor} />,
    );
    const buttonText = getByText('Custom Colors');
    const button = getByTestId('button');

    expect(buttonText.props.style).toEqual(expect.arrayContaining([{ color: customTitleColor }]));
    expect(button.props.style).toHaveProperty('backgroundColor', customColor);
  });
});
