import { Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Represents the possible page names for the main menu button.
 * It can be one of the following values: '/', '/create', '/about', '/showcase', '/configurator'.
 */
type PageName = '/' | '/create' | '/about' | '/showcase' | '/configurator';

/**
 * Props for the MainMenuButton component.
 */
type MainMenuButtonProps = {
    pageName: PageName;
    text: string;
};

/**
 * Renders a main menu button component.
 *
 * @param pageName - The page name for the button.
 * @param text - The text to display on the button.
 * @returns The rendered main menu button component.
 */
export const MainMenuButton = ({ pageName, text }: MainMenuButtonProps) => {
    const location = useLocation();
    const isActive =
        location.pathname === pageName || (pageName === '/create' && location.pathname === '/configurator');

    return (
        <Button as={Link} to={pageName} variant="link">
            <Text textStyle={'button'} fontWeight={isActive ? '600' : '400'} color={'brand.50'}>
                {text}
            </Text>
        </Button>
    );
};
