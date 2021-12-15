const allowedTypes = ( typeName = '', types=[] ) => {
    const isIncluded = types.includes( typeName );

    if( !isIncluded ){
        throw new Error(`The transaction type ${typeName} is not allowed, ${types}`);
    }

    return true;
}


module.exports= {
    allowedTypes
}