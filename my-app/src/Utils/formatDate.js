function formatDate(date) {
    let d = new Date(date),
        day = '' + (d.getDate() + 1),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();
  
    if (day.length < 2) 
        day = '0' + day;
    if (month.length < 2) 
        month = '0' + month;
  
    return [day, month, year].join('-');
} 

export { formatDate };