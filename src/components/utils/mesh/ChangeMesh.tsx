
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
