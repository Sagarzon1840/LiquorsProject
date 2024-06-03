export const getColorClass = (category: string): string => {
    if (category === 'Vino') {
        return 'border-t-wine'; 
    } else if (category === 'Gin') {
        return 'border-t-gin'; 
    } else if (category === 'Whisky'){
        return 'border-t-licor'; 
    }
    return '';
};




