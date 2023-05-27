// ERROR
const ERROR_VI = {
    E_0001: 'Email và mật khẩu không chính xác',
    E_0002: '{0} là trường bắt buộc',
    E_0003: '{0} không đúng định dạng',
    E_0004: 'Mật khẩu không trùng khớp',
    E_0005: 'Có lỗi xảy ra', 
    E_0006: '{0} không tồn tại'
}
const ERROR_EN = {
    E_0001: 'Incorrect email and password',
    E_0002: '{0} is a required field',
    E_0003: '{0} is not in the correct format',
    E_0004: 'Passwords do not match',
    E_0005: 'An error occurred',
    E_0006: '{0} does not exist'
}

//INFOMATION
const INFO_VI = {
    I_0001: 'Link cập nhật mật khẩu đã được gửi tới mail của bạn',
}
const INFO_EN = {
    I_0001: 'The password reset link has been sent to your email'
}

//CONFIRM
//Start with C_XXXX
const CONFIRM = {
    C_0001: '下記の内容で保存してよろしいですか？', // Confirm create/update/delete
}

//SUCCESS
const SUCCESS_VI = {
    S_0001: 'Link cập nhật mật khẩu đã được gửi tới mail của bạn',
    S_0002: 'Cập nhật thành công'
}
const SUCCESS_EN = {
    S_0001: 'The password reset link has been sent to your email',
    S_0002: 'Update success'
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
const SUCCESS = language === 'en' ? SUCCESS_EN : SUCCESS_VI

export const MSG = {
    ERROR, CONFIRM, SUCCESS,
    getMSG: (StrArr, Code) => getMSG(StrArr, Code),
}