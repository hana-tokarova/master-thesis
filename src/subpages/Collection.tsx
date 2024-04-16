import {
    Box,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { CollectionType, JewelryMesh } from '../components/collections/Collections';
import { changeNumericParameter } from '../components/utils/mesh/ChangeMesh';

type LissajousProps = {
    collection: CollectionType;
    mesh: JewelryMesh;
    sliderParameters: { [key: string]: number };
    setSliderParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

export const Collection = ({ collection, mesh, sliderParameters, setSliderParameters }: LissajousProps) => {
    return (
        <Box>
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
                paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
            >
                / {collection.charAt(0).toUpperCase() + collection.slice(1)} properties
            </Text>

            <Flex
                paddingTop="2"
                direction="row"
                rowGap={{ base: 0, sm: 2, md: 4, lg: 6 }}
                columnGap={4}
                wrap="wrap"
                w="88"
            >
                {mesh &&
                    Object.entries(mesh.sliderParameters).map(
                        ([parameterName, parameterDetails]) =>
                            parameterDetails.tag === 'collection' && (
                                <Box key={parameterName + parameterDetails}>
                                    <Text
                                        fontFamily={'heading'}
                                        fontWeight="400"
                                        fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                                    >
                                        {parameterDetails.name}
                                    </Text>
                                    <Slider
                                        margin={2}
                                        mb={4}
                                        w={{ base: '28', sm: '30', md: '32', lg: '40' }}
                                        value={sliderParameters[parameterName]}
                                        min={parameterDetails.min}
                                        max={parameterDetails.max}
                                        step={parameterDetails.step}
                                        onChange={(newValue) =>
                                            changeNumericParameter(setSliderParameters, parameterName, newValue)
                                        }
                                    >
                                        <SliderMark value={parameterDetails.min} mt="3" fontSize="sm">
                                            {parameterDetails.min}
                                        </SliderMark>
                                        <SliderMark value={parameterDetails.max} mt="3" fontSize="sm">
                                            {parameterDetails.max}
                                        </SliderMark>
                                        <SliderTrack bg="brand.200" shadow="md">
                                            <SliderFilledTrack bg="brand.100" />
                                        </SliderTrack>
                                        <Tooltip
                                            bg="brand.100"
                                            color="white"
                                            placement="bottom"
                                            label={sliderParameters[parameterName]}
                                        >
                                            <SliderThumb
                                                _focus={{
                                                    ring: '1px',
                                                    ringColor: 'brand.100',
                                                    ringOffset: '1px',
                                                    ringOffsetColor: 'brand.100',
                                                }}
                                            />
                                        </Tooltip>
                                    </Slider>
                                </Box>
                            ),
                    )}
            </Flex>
        </Box>
    );
};
