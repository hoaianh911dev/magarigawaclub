const MESSAGE_VI = {
    // error
    E_0001: 'Email và mật khẩu không chính xác',
    E_0002: '{0} là trường bắt buộc',
    E_0003: '{0} không đúng định dạng',
    E_0004: 'Mật khẩu không trùng khớp',
    E_0005: 'Có lỗi xảy ra', 
    E_0006: '{0} không tồn tại',
    E_0007: 'Mật khẩu phải chứa ít nhất một số, một chữ hoa, chữ thường và ít nhất 8 ký tự',
    // success
    S_0001: 'Link cập nhật mật khẩu đã được gửi tới mail của bạn',
    S_0002: 'Cập nhật thành công',
    S_0003: 'Đăng nhập thành công! Chào mừng bạn đến với MAGARIGAWA CLUB',
    S_0004: 'Tạo {0} thành công',
    // infor
    I_0001: 'Link cập nhật mật khẩu đã được gửi tới mail của bạn',
}
const MESSAGE_EN = {
    // error
    E_0001: 'Incorrect email and password',
    E_0002: '{0} is a required field',
    E_0003: '{0} is not in the correct format',
    E_0004: 'Passwords do not match',
    E_0005: 'An error occurred',
    E_0006: '{0} does not exist',
    E_0007: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
    // success
    S_0001: 'The password reset link has been sent to your email',
    S_0002: 'Update success',
    S_0003: 'Logged in successfully! Welcome to MAGARIGAWA CLUB',
    S_0004: 'Create {0} successful',
    // infor
    I_0001: 'The password reset link has been sent to your email'
}

const NAME_FORM_EN = {
    N0001: "customer"
}

const NAME_FORM_VI = {
    N0001: "khách hàng"
}

//Get message
export default function getMSG (Code, StrArr?) {

    const lang = localStorage.getItem('language')
    let message = lang === 'en' ? `${MESSAGE_EN[Code]}` : `${MESSAGE_VI[Code]}`
   
    if (StrArr) {
        StrArr.forEach(function (value, index) {
            let name = lang === 'en' ? `${NAME_FORM_EN[value]}` : `${NAME_FORM_VI[value]}`
            message = message.replace("{" + index + "}", name);
        });
    }

    return message

}