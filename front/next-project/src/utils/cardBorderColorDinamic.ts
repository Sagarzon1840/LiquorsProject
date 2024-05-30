export const getColorClass = (category: string): string => {
    if (category === 'vino') {
        return 'border-t-wine'; 
    } else if (category === 'gin') {
        return 'border-t-gin'; 
    } else if (category === 'licor'){
        return 'border-t-licor'; 
    }
    return '';
};




