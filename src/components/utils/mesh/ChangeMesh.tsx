import React, { useEffect } from "react";
import { collections, CollectionType, JewelryMesh, JewelryType, RingSize } from "../../collections/Collections";

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


export const useMeshParameters = (collection: CollectionType, jewelry: JewelryType) => {
    const [mesh, setMesh] = React.useState<JewelryMesh | undefined>(undefined);
    const [sliderParameters, setSliderParameters] = React.useState<{ [key: string]: number }>({});
    const [switchParameters, setSwitchParameters] = React.useState<{ [key: string]: boolean }>({});
    const [dropdownParameters, setDropdownParameters] = React.useState<{ [key: string]: RingSize }>({});

    const [currentCollection, setCurrentCollection] = React.useState<CollectionType>(collection);
    const [currentJewelryType, setCurrentJewelryType] = React.useState<JewelryType>(jewelry);

    useEffect(() => {
        const newMesh = collections[currentCollection]?.meshes[currentJewelryType];
        if (newMesh) {
            setMesh(newMesh);

            setSliderParameters(Object.entries(newMesh.sliderParameters).reduce((prev, [key, val]) => ({ ...prev, [key]: val.value }), {}));
            setSwitchParameters(Object.entries(newMesh.switchParameters).reduce((prev, [key, val]) => ({ ...prev, [key]: val.value }), {}));
            setDropdownParameters(Object.entries(newMesh.dropdownParameters).reduce((prev, [key, val]) => ({ ...prev, [key]: val.size }), {}));
        }

    }, [currentCollection, currentJewelryType]);

    return { mesh, sliderParameters, switchParameters, dropdownParameters, setSliderParameters, setSwitchParameters, setDropdownParameters, currentCollection, setCurrentCollection, currentJewelryType, setCurrentJewelryType };
};
