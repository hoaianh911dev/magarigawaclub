// ERROR
const ERROR_VI = {
    E_0001: 'Email và mật khẩu không chính xác',
    E_0002: '{0} là trường bắt buộc',
    E_0003: '{0} không đúng định dạng',
    E_0004: 'Mật khẩu không trùng khớp'
}
const ERROR_EN = {
    E_0001: 'Incorrect email and password',
    E_0002: '{0} is a required field',
    E_0003: '{0} is not in the correct format',
    E_0004: 'Passwords do not match'
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

const language = localStorage.getItem('language')
const ERROR = language === 'en' ? ERROR_EN : ERROR_VI

export const MSG = {
    ERROR, INFO, CONFIRM, SUCCESS,
    getMSG: (StrArr, Code) => getMSG(StrArr, Code),
}