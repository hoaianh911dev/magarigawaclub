// ERROR
const ERROR = {
    E_0001: 'Email và mật khẩu không chính xác'
}


//INFOMATION
//Start with I_XXXX
const INFO = {
    I_0001: '複写が成功しました。', // Copy success
}

//CONFIRM
//Start with C_XXXX
const CONFIRM = {
    C_0001: '下記の内容で保存してよろしいですか？', // Confirm create/update/delete
}

//SUCCESS
const SUCCESS = {
    S_0001: 'パスワード再設定を完了しました。', //update password
    S_0002: 'パスワードリセットのメールを送信しました。<br> メールに記載されているリンクからパスワードの再設定を行ってください。', //send mail
    S_0003: '送信しました'
}

//Get message
const getMSG = (StrArr, Code) => {
    if (StrArr) {
        StrArr.forEach(function (value, index) {
            Code = Code.replace("{" + index + "}", value);
        });
    }
    return Code
}

export const MSG = {
    ERROR, INFO, CONFIRM, SUCCESS,
    getMSG: (StrArr, Code) => getMSG(StrArr, Code),
}