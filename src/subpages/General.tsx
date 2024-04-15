import { Box, Flex, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip } from "@chakra-ui/react";
import { BraceletSize, braceletSizes, JewelryMesh, JewelryType, RingSize, ringSizes } from "../components/collections/Collections";
import { changeDropdownParameter, changeJewelryType, changeNumericParameter } from "../components/utils/mesh/ChangeMesh";

type GeneralProps = {
    mesh: JewelryMesh
    currentJewelryType: JewelryType;
    setCurrentJewelryType: React.Dispatch<React.SetStateAction<JewelryType>>;
    dropdownParameters: { [key: string]: RingSize | BraceletSize; }
    setDropdownParameters: React.Dispatch<React.SetStateAction<{ [key: string]: RingSize | BraceletSize; }>>;
    sliderParameters: { [key: string]: number; }
    setSliderParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number; }>>;
    sliderMinParameters: { [key: string]: number; }
}

export const General = ({ mesh, currentJewelryType, setCurrentJewelryType, dropdownParameters, setDropdownParameters, sliderParameters, setSliderParameters, sliderMinParameters }: GeneralProps) => {
    return (
        <Box>
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
            >
                / General
            </Text>

            <Flex
                paddingTop="2"
                paddingBottom="4"
                direction="row"
                rowGap={{ base: 2, sm: 3, md: 4, lg: 5 }}
                columnGap={4}
                wrap='wrap'
            >
                <Text
                    fontFamily={"heading"}
                    fontWeight="400"
                    fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                >
                    Jewelry type

                    <Select
                        w={44}
                        fontFamily={"body"}
                        fontWeight="400"
                        fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                        bg='brand.200'
                        border="none"
                        color='brand.50'
                        size='md'
                        shadow={'lg'}
                        paddingTop={2}
                        paddingBottom={4}
                        value={currentJewelryType}
                        _hover={{ bg: 'brand.400' }}
                        _focus={{ bg: 'brand.300' }}
                        onChange={(event) => {
                            const selectedJewelryType = event.target.value as JewelryType;
                            changeJewelryType(setCurrentJewelryType, selectedJewelryType);
                        }}
                    >
                        {Object.entries(JewelryType).map(([jewerlyName, jewelryType], index) => (
                            <option
                                key={index}
                                value={jewelryType}
                            >
                                {jewerlyName}
                            </option>
                        ))}
                    </Select>
                </Text>

                {mesh && (currentJewelryType === JewelryType.Ring) && Object.entries(mesh.dropdownParameters).map(([parameterName, parameterDetails]) => (
                    <Box key={parameterName + parameterDetails}>
                        <Text
                            fontFamily={"heading"}
                            fontWeight="400"
                            fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                        >
                            {parameterDetails.name}
                            <Box
                                as="span"
                                fontWeight="600"
                                fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                            >
                                {" (Diameter:"}
                                <Box
                                    fontWeight="400"
                                    as="span"
                                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                >
                                    {" " + dropdownParameters[parameterName]?.diameter + " mm)"}
                                </Box>
                            </Box>

                        </Text>
                        <Select
                            w={44}
                            fontFamily={"body"}
                            fontWeight="400"
                            fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                            value={dropdownParameters[parameterName]?.value}
                            bg='brand.200'
                            border="none"
                            color='brand.50'
                            size='md'
                            shadow={'lg'}
                            paddingTop={2}
                            paddingBottom={4}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.300' }}
                            onChange={(event) => {
                                const parsedValue = parseInt(event.target.value);
                                const selectedSize = ringSizes.find(size => size.value === parsedValue);
                                changeDropdownParameter(setDropdownParameters, parameterName, selectedSize!);
                            }}
                        >
                            {ringSizes.map((ringSize) => (
                                <option
                                    key={ringSize.value.toString()}
                                    value={ringSize.value}
                                >
                                    {"Sz " + ringSize.value.toString()}
                                </option>
                            ))}
                        </Select>
                    </Box>
                ))}

                {mesh && (currentJewelryType === JewelryType.Bracelet) && Object.entries(mesh.dropdownParameters).map(([parameterName, parameterDetails]) => (
                    <Box key={parameterName + parameterDetails}>
                        <Text
                            fontFamily={"heading"}
                            fontWeight="400"
                            fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                        >
                            {parameterDetails.name}
                            <Box
                                as="span"
                                fontWeight="600"
                                fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                            >
                                {" (Diameter:"}
                                <Box
                                    fontWeight="400"
                                    as="span"
                                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                >
                                    {" " + dropdownParameters[parameterName]?.diameter + " mm)"}
                                </Box>
                            </Box>

                        </Text>
                        <Select
                            w={44}
                            fontFamily={"body"}
                            fontWeight="400"
                            fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                            value={dropdownParameters[parameterName]?.value}
                            bg='brand.200'
                            border="none"
                            color='brand.50'
                            size='md'
                            shadow={'lg'}
                            paddingTop={2}
                            paddingBottom={4}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.300' }}
                            onChange={(event) => {
                                const parsedValue = parseInt(event.target.value);
                                const selectedSize = braceletSizes.find(size => size.value === parsedValue);
                                changeDropdownParameter(setDropdownParameters, parameterName, selectedSize!);
                            }}
                        >
                            {braceletSizes.map((braceletSize) => (
                                <option
                                    key={braceletSize.value.toString()}
                                    value={braceletSize.value}
                                >
                                    {"Sz " + braceletSize.value.toString()}
                                </option>
                            ))}
                        </Select>
                    </Box>
                ))}

                {mesh && Object.entries(mesh.sliderParameters).map(([parameterName, parameterDetails]) => (
                    parameterDetails.tag === 'general' && (
                        <Box key={parameterName + parameterDetails}>
                            <Text
                                fontFamily={"heading"}
                                fontWeight="400"
                                fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                            >
                                {parameterDetails.name}
                                <Box
                                    as="span"
                                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                >
                                    {parameterName === "r" || "scaleB" ? " (in mm)" : ""}
                                </Box>
                            </Text>
                            <Slider
                                margin={2}
                                w={{ base: "28", sm: "30", md: "32", lg: "40" }}
                                value={sliderParameters[parameterName]}
                                min={sliderMinParameters[parameterName]}
                                max={parameterDetails.max}
                                step={parameterDetails.step}
                                onChange={(newValue) => changeNumericParameter(setSliderParameters, parameterName, newValue)}
                            >
                                <SliderMark value={sliderMinParameters[parameterName]} mt='1' fontSize='sm'>
                                    {sliderMinParameters[parameterName]}
                                </SliderMark>
                                <SliderMark value={parameterDetails.max} mt='1' fontSize='sm'>
                                    {parameterDetails.max}
                                </SliderMark>
                                <SliderTrack bg='brand.200' shadow='md'>
                                    <SliderFilledTrack bg='brand.100' />
                                </SliderTrack>
                                <Tooltip
                                    bg='brand.100'
                                    color='white'
                                    placement='bottom'
                                    label={sliderParameters[parameterName] + " mm"}
                                >
                                    <SliderThumb
                                        _focus={{
                                            ring: "1px",
                                            ringColor: "brand.100",
                                            ringOffset: "1px",
                                            ringOffsetColor: "brand.100"
                                        }}
                                    />
                                </Tooltip>
                            </Slider>
                        </Box>
                    )
                ))}
            </Flex>
        </Box>

    );
}