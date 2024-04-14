import { Box, Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip } from "@chakra-ui/react";
import { JewelryMesh } from "../components/collections/Collections";
import { changeNumericParameter } from "../components/utils/mesh/ChangeMesh";

type LissajousProps = {
    mesh: JewelryMesh,
    numericParameters: { [key: string]: number },
    setNumericParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number; }>>,
}

export const Lissajous = ({ mesh, numericParameters, setNumericParameters }: LissajousProps) => {
    return (
        <Box>
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
            >
                / Lissajous properties
            </Text>

            <Flex
                paddingTop="2"
                paddingBottom="4"
                direction="row"
                rowGap={{ base: 0, sm: 2, md: 4, lg: 6 }}
                columnGap={4}
                wrap='wrap'
            >
                {mesh && Object.entries(mesh.numericParameters).map(([parameterName, parameterDetails]) => (
                    parameterDetails.tag === 'collection' && (
                        <div key={parameterName + parameterDetails}>
                            <Text
                                fontFamily={"heading"}
                                fontWeight="400"
                                fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                            >
                                {parameterDetails.name}
                            </Text>
                            <Slider
                                margin={2}
                                w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                                value={numericParameters[parameterName]}
                                min={parameterDetails.min}
                                max={parameterDetails.max}
                                step={parameterDetails.step}
                                onChange={(newValue) => changeNumericParameter(setNumericParameters, parameterName, newValue)}
                            >

                                <SliderMark value={parameterDetails.min} mt='1' fontSize='sm'>
                                    {parameterDetails.min}
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
                                    label={numericParameters[parameterName]}
                                >
                                    <SliderThumb />
                                </Tooltip>
                            </Slider>
                        </div>
                    )
                ))}
            </Flex>
        </Box>
    );
}