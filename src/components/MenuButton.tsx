import { Button, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

type PageName = "" | "create" | "about" | "showcase";

type SidebarButtonProps = {
    pageName: PageName;
    text: string;
};

export const MenuButton = ({ pageName, text }: SidebarButtonProps) => {
    const location = useLocation();
    const openedPage = location.pathname.split('/')[1];

    return (
        <Button
            as={Link}
            to={`/${pageName}`}
            variant="link"
        >
            <Text
                fontSize="md"
                fontWeight={openedPage === pageName ? "600" : "400"}
                color={"brand.50"}
            >
                {text}
            </Text>
        </Button>
    );
};
