export const cleanData = (data) => {
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach(key => {
        if (cleanedData[key] === "") {
            cleanedData[key] = null;
        }
    });
    return cleanedData;
};