import React from "react";
import { CollectionType, JewelryMesh, JewelryType, RingSize } from "../../collections/Collections";

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
 * Function to update a dropdown parameter's value in the state.
 * @param setDropdownParameters - The React state setter function for dropdown parameters.
 * @param parameterName - The name of the parameter to update.
 * @param newValue - The new value for the parameter.
 */
export const changeDropdownParameter = (
    setDropdownParameters: React.Dispatch<React.SetStateAction<{ [key: string]: RingSize }>>,
    parameterName: string,
    newValue: RingSize
): void => {
    setDropdownParameters(prevParams => {
        const updatedParams = {
            ...prevParams,
            [parameterName]: { ...newValue }
        };
        return updatedParams;
    });
}

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
 * Function to change the jewelry type in the state.
 * @param setJewelryType - The React state setter function for the jewelry type.
 * @param jewelryType - The new jewelry type.
 */
export const changeJewelryType = (
    setJewelryType: React.Dispatch<React.SetStateAction<JewelryType>>,
    jewelryType: JewelryType
): void => {
    setJewelryType(jewelryType);
}

/**
 * Custom hook to manage mesh parameters in the state.
 * @param collection - The current collection type.
 * @param jewelry - The current jewelry type.
 * @param mesh - The mesh object to extract parameters from.
 * @returns The slider, switch and number input parameters, and their setter functions.
 */
export const useMeshParameters = (collection: CollectionType, jewelry: JewelryType, mesh?: JewelryMesh) => {
    const [sliderParameters, setSliderParameters] = React.useState<{ [key: string]: number }>({});
    const [switchParameters, setSwitchParameters] = React.useState<{ [key: string]: boolean }>({});
    const [dropdownParameters, setDropdownParameters] = React.useState<{ [key: string]: RingSize }>({});

    const [currentCollection, setCurrentCollection] = React.useState<CollectionType>();
    const [currentJewelryType, setCurrentJewelryType] = React.useState<JewelryType>(JewelryType.Ring);

    React.useEffect(() => {
        if (!mesh) return;
        setSliderParameters(() => Object.entries(mesh.sliderParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
        setSwitchParameters(() => Object.entries(mesh.switchParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
        setDropdownParameters(() => Object.entries(mesh.dropdownParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].size }), {}));

        setCurrentCollection(collection);
        setCurrentJewelryType(jewelry);
    }, [mesh, collection, jewelry]);

    return { sliderParameters, switchParameters, dropdownParameters, setSliderParameters, setSwitchParameters, setDropdownParameters, currentCollection, currentJewelryType, setCurrentJewelryType };
};
