export const getDateTime = () => { 
    const today = new Date()
    const dateTime = {
        date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        time: today.getHours() + ":" + today.getMinutes(),
    }

    return dateTime;
}