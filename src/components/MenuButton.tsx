import { Button, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

type PageName = "" | "create" | "about" | "showcase";

type SidebarButtonProps = {
    pageName: PageName;
    text: string;
};

export const MenuButton = ({ pageName, text }: SidebarButtonProps) => {
    const location = useLocation();
    const openedPage = location.pathname.split("/")[1];

    return (
        <Button
            as={Link}
            to={`/${pageName}`}
            variant="ghost"
        // _focus={{
        //     color:
        //         openedPage == pageName
        //             ? useColorModeValue('brand.500', 'brand.400')
        //             : useColorModeValue('gray.900', 'gray.50'),
        // }}
        // _hover={{
        //     textDecoration: 'none',
        // }}
        >
            <Text
                fontSize="md"
                color={"green"}
            // fontWeight={'regular'}
            >
                {text}
            </Text>
        </Button>
    );
};
