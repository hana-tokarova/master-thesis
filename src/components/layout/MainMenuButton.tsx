import { Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

type PageName = '/' | '/create' | '/about' | '/showcase' | '/configurator';

type MainMenuButtonProps = {
    pageName: PageName;
    text: string;
};

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
