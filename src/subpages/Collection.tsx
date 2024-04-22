import {
    Box,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Switch,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { CollectionType, JewelryMesh } from '../components/collections/Collections';
import { changeBooleanParameter, changeNumericParameter } from '../components/utils/mesh/ChangeMesh';

type LissajousProps = {
    collection: CollectionType;
    mesh: JewelryMesh;
    sliderParameters: { [key: string]: number };
    switchParameters: { [key: string]: boolean };
    setSliderParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    setSwitchParameters: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export const Collection = ({
    collection,
    mesh,
    sliderParameters,
    setSliderParameters,
    switchParameters,
    setSwitchParameters,
}: LissajousProps) => {
    return (
        <Box>
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
                paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                color="brand.50"
            >
                / {collection.charAt(0).toUpperCase() + collection.slice(1)} properties
            </Text>

            <Flex
                paddingTop="2"
                paddingBottom="4"
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
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        color={'brand.50'}
                                    >
                                        {parameterDetails.name}
                                    </Text>
                                    <Slider
                                        margin={2}
                                        mb={4}
                                        w={{ base: '32', md: '40' }}
                                        value={sliderParameters[parameterName]}
                                        min={parameterDetails.min}
                                        max={parameterDetails.max}
                                        step={parameterDetails.step}
                                        onChange={(newValue) =>
                                            changeNumericParameter(setSliderParameters, parameterName, newValue)
                                        }
                                    >
                                        <SliderMark
                                            value={parameterDetails.min}
                                            mt="3"
                                            fontSize={{ base: 'xs', md: 'sm' }}
                                            color={'brand.50'}
                                        >
                                            {parameterDetails.min}
                                        </SliderMark>
                                        <SliderMark
                                            value={parameterDetails.max}
                                            mt="3"
                                            fontSize={{ base: 'xs', md: 'sm' }}
                                            color={'brand.50'}
                                        >
                                            {parameterDetails.max}
                                        </SliderMark>
                                        <SliderTrack bg="brand.200" shadow="md">
                                            <SliderFilledTrack bg="brand.50" />
                                        </SliderTrack>
                                        <Tooltip
                                            bg="brand.50"
                                            color="white"
                                            placement="bottom"
                                            label={sliderParameters[parameterName]}
                                        >
                                            <SliderThumb
                                                _focus={{
                                                    ring: '1px',
                                                    ringColor: 'brand.50',
                                                    ringOffset: '1px',
                                                    ringOffsetColor: 'brand.50',
                                                }}
                                            />
                                        </Tooltip>
                                    </Slider>
                                </Box>
                            ),
                    )}

                {mesh &&
                    Object.entries(mesh.switchParameters).map(
                        ([parameterName, parameterDetails]) =>
                            parameterDetails.tag === 'collection' && (
                                <Box key={parameterName + parameterDetails}>
                                    <Text
                                        fontFamily={'heading'}
                                        fontWeight="400"
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        color={'brand.50'}
                                    >
                                        {parameterDetails.name}
                                    </Text>

                                    <Tooltip
                                        bg="brand.50"
                                        color="white"
                                        placement="bottom"
                                        label={switchParameters[parameterName] === true ? 'On' : 'Off'}
                                        shouldWrapChildren
                                    >
                                        <Switch
                                            margin={1}
                                            size="lg"
                                            isChecked={switchParameters[parameterName]}
                                            sx={{
                                                '.chakra-switch__thumb': {
                                                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
                                                },
                                                '.chakra-switch__track': {
                                                    bg: 'brand.500',
                                                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                                                    _checked: {
                                                        bg: 'brand.50',
                                                    },
                                                    _focus: {
                                                        ring: '0px',
                                                        ringColor: 'none',
                                                        ringOffset: '0px',
                                                        ringOffsetColor: 'none',
                                                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                                                    },
                                                },
                                            }}
                                            onChange={(newValue) =>
                                                changeBooleanParameter(
                                                    setSwitchParameters,
                                                    parameterName,
                                                    newValue.target.checked,
                                                )
                                            }
                                        />
                                    </Tooltip>
                                </Box>
                            ),
                    )}
            </Flex>
        </Box>
    );
};
