export const initTable = (tableId) =>{
    if (window.$) {
        const $ = window.$;

        if ($.fn.DataTable.isDataTable(tableId)) {
            $(tableId).DataTable().destroy();
        }

        
    }
};