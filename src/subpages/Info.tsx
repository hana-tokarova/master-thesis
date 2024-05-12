import { Box, Text } from '@chakra-ui/react';
import { CollectionType, JewelryMesh, JewelryType } from '../components/collections/Collections';

type InfoProps = {
    collection: CollectionType;
    jewelry: JewelryType;
    mesh: JewelryMesh;
};

export const Info = ({ collection, jewelry, mesh }: InfoProps) => {
    return (
        <Box>
            <Text textStyle={'header1'}>
                / {collection.charAt(0).toUpperCase() + collection.slice(1)}{' '}
                {jewelry.charAt(0).toUpperCase() + jewelry.slice(1)}
            </Text>

            <Text textStyle="body">{mesh.description}</Text>
        </Box>
    );
};
