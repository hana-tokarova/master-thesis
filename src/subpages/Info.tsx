import { Box, Text } from '@chakra-ui/react';
import { CollectionType, JewelryMesh, JewelryType } from '../components/collections/Collections';

/**
 * Props for the Info component.
 */
type InfoProps = {
    collection: CollectionType;
    jewelry: JewelryType;
    mesh: JewelryMesh;
};

/**
 * Renders information about a collection, jewelry, and mesh.
 *
 * @param props - The component props.
 * @returns The rendered component.
 */
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
