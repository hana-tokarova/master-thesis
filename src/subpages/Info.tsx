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
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                color={'brand.50'}
            >
                / {collection.charAt(0).toUpperCase() + collection.slice(1)}{' '}
                {jewelry.charAt(0).toUpperCase() + jewelry.slice(1)}
            </Text>

            <Text color={'brand.50'} fontSize={{ base: 'xs', md: 'sm' }}>
                {mesh.description}
            </Text>
        </Box>
    );
};
