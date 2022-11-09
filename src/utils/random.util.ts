export function randomOtp(length: number) : string{
    let result = '';
    const characters = '0123456789';
    var charactersLength = characters.length;

    for(let i = 0; i< length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
