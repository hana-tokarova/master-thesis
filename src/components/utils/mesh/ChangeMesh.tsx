import React from "react";
import { CollectionType, JewelryMesh, JewelryType } from "../../collections/Collections";

/**
 * Function to change the color of a mesh.
 * @param setMeshColor - The React state setter function for setting the color.
 * @param color - The new color value as a string.
 */
export const changeMeshColor = (setMeshColor: (color: string) => void, color: string) => {
    setMeshColor(color);
};

/**
 * Function to update a numeric parameter's value in the state.
 * @param setNumericParameters - The React state setter function for numeric parameters.
 * @param parameterName - The name of the parameter to update.
 * @param newValue - The new value for the parameter.
 */
export const changeNumericParameter = (
    setNumericParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>,
    parameterName: string,
    newValue: number
): void => {
    setNumericParameters(prevParams => ({
        ...prevParams,
        [parameterName]: newValue,
    }));
};

/**
 * Function to update a boolean parameter's value in the state.
 * @param setBooleanParameters - The React state setter function for boolean parameters.
 * @param parameterName - The name of the parameter to update.
 * @param newValue - The new boolean value for the parameter.
 */
export const changeBooleanParameter = (
    setBooleanParameters: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    parameterName: string,
    newValue: boolean
): void => {
    setBooleanParameters(prevParams => ({
        ...prevParams,
        [parameterName]: newValue,
    }));
};

/**
 * Custom hook to manage mesh parameters in the state.
 * @param collection - The current collection type.
 * @param jewelry - The current jewelry type.
 * @param mesh - The mesh object to extract parameters from.
 * @returns The numeric and boolean parameters, and their setter functions.
 */
export const useMeshParameters = (collection: CollectionType, jewelry: JewelryType, mesh?: JewelryMesh) => {
    const [sliderParameters, setSliderParameters] = React.useState<{ [key: string]: number }>({});
    const [switchParameters, setSwitchParameters] = React.useState<{ [key: string]: boolean }>({});
    const [numberInputParameters, setNumberInputParameters] = React.useState<{ [key: string]: number }>({});

    const [currentCollection, setCurrentCollection] = React.useState<CollectionType>();
    const [currentJewelryType, setCurrentJewelryType] = React.useState<JewelryType>();

    React.useEffect(() => {
        // TODO opravit pomocou react three pitfalls mutate, use deltas, alebo sa pozriet ci je to ok a pozriet sa aj na kolekciach
        if (!mesh) return;
        setSliderParameters(() => Object.entries(mesh.sliderParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
        setSwitchParameters(() => Object.entries(mesh.switchParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
        setNumberInputParameters(() => Object.entries(mesh.numberInputParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));

        setCurrentCollection(collection);
        setCurrentJewelryType(jewelry);
    }, [mesh, collection, jewelry]);

    return { sliderParameters, switchParameters, numberInputParameters, setSliderParameters, setSwitchParameters, setNumberInputParameters, currentCollection, currentJewelryType };
};
