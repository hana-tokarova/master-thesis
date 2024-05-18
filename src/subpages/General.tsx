import {
    Box,
    Flex,
    Select,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import {
    BraceletSize,
    braceletSizes,
    JewelryMesh,
    JewelryType,
    RingSize,
    ringSizes,
} from '../components/collections/Collections';
import {
    changeDropdownParameter,
    changeJewelryType,
    changeNumericParameter,
} from '../components/utils/mesh/ChangeMesh';

/**
 * Props for the General component.
 */
type GeneralProps = {
    mesh: JewelryMesh;
    currentJewelryType: JewelryType;
    setCurrentJewelryType: (type: JewelryType) => void;
    dropdownParameters: { [key: string]: RingSize | BraceletSize };
    setDropdownParameters: React.Dispatch<React.SetStateAction<{ [key: string]: RingSize | BraceletSize }>>;
    sliderParameters: { [key: string]: number };
    setSliderParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    sliderMinParameters: { [key: string]: number };
};

/**
 * Renders the General component.
 *
 * @param props - The component props.
 * @returns The rendered General component.
 */
export const General = ({
    mesh,
    currentJewelryType,
    setCurrentJewelryType,
    dropdownParameters,
    setDropdownParameters,
    sliderParameters,
    setSliderParameters,
    sliderMinParameters,
}: GeneralProps) => {
    return (
        <Box>
            <Text textStyle={'header2'} paddingTop={2}>
                / General
            </Text>

            <Flex paddingTop="2" direction="row" rowGap={4} columnGap={4} wrap="wrap">
                <Text as="div" textStyle={'bodyHighlight'}>
                    Jewelry type
                    <Select
                        w={{ base: 36, md: 44 }}
                        textStyle={'body'}
                        fontSize={{ base: '2xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                        bg="brand.200"
                        border="none"
                        color="brand.50"
                        cursor="pointer"
                        shadow={'lg'}
                        paddingTop={2}
                        paddingBottom={4}
                        value={currentJewelryType}
                        _hover={{ bg: 'brand.400' }}
                        onChange={(event) => {
                            const selectedJewelryType = event.target.value as JewelryType;
                            changeJewelryType(setCurrentJewelryType, selectedJewelryType);
                        }}
                    >
                        {Object.entries(JewelryType).map(([jewerlyName, jewelryType], index) => (
                            <option key={index} value={jewelryType}>
                                {jewerlyName}
                            </option>
                        ))}
                    </Select>
                </Text>

                {mesh &&
                    currentJewelryType === JewelryType.Ring &&
                    Object.entries(mesh.dropdownParameters).map(([parameterName, parameterDetails]) => (
                        <Box key={parameterName + parameterDetails}>
                            <Text textStyle={'bodyHighlight'}>
                                {parameterDetails.name}
                                <Box as="span" textStyle={'body'}>
                                    {' (Diameter: ' + dropdownParameters[parameterName]?.diameter + ' mm)'}
                                </Box>
                            </Text>
                            <Select
                                w={{ base: 36, md: 44 }}
                                textStyle={'body'}
                                fontSize={{ base: '2xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                                value={dropdownParameters[parameterName]?.value}
                                bg="brand.200"
                                border="none"
                                color="brand.50"
                                cursor="pointer"
                                shadow={'lg'}
                                paddingTop={2}
                                paddingBottom={4}
                                _hover={{ bg: 'brand.400' }}
                                onChange={(event) => {
                                    const parsedValue = parseInt(event.target.value);
                                    const selectedSize = ringSizes.find((size) => size.value === parsedValue);
                                    changeDropdownParameter(setDropdownParameters, parameterName, selectedSize!);
                                }}
                            >
                                {ringSizes.map((ringSize) => (
                                    <option key={ringSize.value.toString()} value={ringSize.value}>
                                        {'Sz ' + ringSize.value.toString()} (Circumference {ringSize.value} mm)
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    ))}

                {mesh &&
                    currentJewelryType === JewelryType.Bracelet &&
                    Object.entries(mesh.dropdownParameters).map(([parameterName, parameterDetails]) => (
                        <Box key={parameterName + parameterDetails}>
                            <Text textStyle={'bodyHighlight'}>
                                {parameterDetails.name}
                                <Box as="span" textStyle={'body'}>
                                    {' (Diameter: ' + dropdownParameters[parameterName]?.diameter + ' mm)'}
                                </Box>
                            </Text>
                            <Select
                                w={{ base: 36, md: 44 }}
                                textStyle={'body'}
                                fontSize={{ base: '2xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                                value={dropdownParameters[parameterName]?.value}
                                bg="brand.200"
                                border="none"
                                cursor="pointer"
                                color="brand.50"
                                shadow={'lg'}
                                paddingTop={2}
                                paddingBottom={4}
                                _hover={{ bg: 'brand.400' }}
                                onChange={(event) => {
                                    const parsedValue = parseInt(event.target.value);
                                    const selectedSize = braceletSizes.find((size) => size.value === parsedValue);
                                    changeDropdownParameter(setDropdownParameters, parameterName, selectedSize!);
                                }}
                            >
                                {braceletSizes.map((braceletSize) => (
                                    <option key={braceletSize.value.toString()} value={braceletSize.value}>
                                        {'Sz ' + braceletSize.value.toString()} (Circumference {braceletSize.value} mm)
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    ))}

                {mesh &&
                    Object.entries(mesh.sliderParameters).map(
                        ([parameterName, parameterDetails]) =>
                            parameterDetails.tag === 'general' && (
                                <Box key={parameterName + parameterDetails}>
                                    <Text textStyle={'bodyHighlight'}>
                                        {parameterDetails.name}
                                        <Box as="span" textStyle={'body'}>
                                            {parameterName === 'r' || 'scaleB' ? ' (in mm)' : ''}
                                        </Box>
                                    </Text>
                                    <Slider
                                        margin={2}
                                        mb={4}
                                        w={{ base: 32, md: 40 }}
                                        value={sliderParameters[parameterName]}
                                        min={sliderMinParameters[parameterName]}
                                        max={parameterDetails.max}
                                        step={parameterDetails.step}
                                        onChange={(newValue) =>
                                            changeNumericParameter(setSliderParameters, parameterName, newValue)
                                        }
                                    >
                                        <SliderMark
                                            value={sliderMinParameters[parameterName]}
                                            mt="3"
                                            textStyle={'body'}
                                            color="brand.50"
                                        >
                                            {sliderMinParameters[parameterName]}
                                        </SliderMark>
                                        <SliderMark
                                            value={parameterDetails.max}
                                            mt="3"
                                            textStyle={'body'}
                                            color="brand.50"
                                        >
                                            {parameterDetails.max}
                                        </SliderMark>
                                        <SliderTrack bg="brand.200" shadow="md">
                                            <SliderFilledTrack bg="brand.50" />
                                        </SliderTrack>
                                        <Tooltip
                                            bg="brand.50"
                                            color="brand.200"
                                            placement="bottom"
                                            label={sliderParameters[parameterName] + ' mm'}
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
            </Flex>
        </Box>
    );
};
