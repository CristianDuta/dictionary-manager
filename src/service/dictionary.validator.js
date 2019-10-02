function ValidateDictionary(dictionary, row) {
    let errors = new Set(dictionary.errors);
    let warnings = new Set(dictionary.warnings);

    errors.delete(row.rowId);
    warnings.delete(row.rowId);

    for (const {rowId, domain, range} of dictionary.data) {
        if (row.rowId === rowId) {
            continue;
        }

        if (row.domain === domain && row.range === range) {
            warnings.add(row.rowId);
            warnings.add(rowId);
        }

        if (row.domain === domain && row.range !== range) {
            warnings.add(row.rowId);
            warnings.add(rowId);
        }

        if (row.domain === range || row.range === domain) {
            warnings.add(row.rowId);
            warnings.add(rowId);
        }

        if (row.domain === range && row.range === domain) {
            errors.add(row.rowId);
            errors.add(rowId);
        }
    }

    dictionary.errors = [...errors];
    dictionary.warnings = [...warnings];
}

export default ValidateDictionary;
