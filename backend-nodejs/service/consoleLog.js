
export const printIn = (data) => {
    if (process.env.STATE_CONSOLE_LOG == 1){
    console.log(data)
    }
}