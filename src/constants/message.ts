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
    S_0005: 'Thêm {0} thành công',
    S_0006: 'Xóa {0} thành công',
    // infor
    I_0001: 'Link cập nhật mật khẩu đã được gửi tới mail của bạn',
    // question
    Q_0001: 'Bạn có muốn thêm {0} thành bạn bè?',
    Q_0002: 'Bạn có muốn xóa {0} khỏi danh sách bạn bè?'
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
    S_0005: 'Successfully added {0}',
    S_0006: 'Successfully removed {0}',
    // infor
    I_0001: 'The password reset link has been sent to your email',
    // question
    Q_0001: 'Do you want to add {0} as a friend?',
    Q_0002: 'Do you want to remove {0} from your friends list?'
}

const NAME_FORM_EN = {
    N0001: "customer",
    N0002: "friend",
    N0003: "order"
}

const NAME_FORM_VI = {
    N0001: "khách hàng",
    N0002: "bạn bè",
    N0003: "đơn hàng"
}

//Get message
export default function getMSG (Code, StrArr?) {

    const lang = localStorage.getItem('language')
    let message = lang === 'en' ? `${MESSAGE_EN[Code]}` : `${MESSAGE_VI[Code]}`
   
    if (StrArr) {
        StrArr.forEach(function (value, index) {
            let name = lang === 'en' ? `${NAME_FORM_EN[value]}` : `${NAME_FORM_VI[value]}`
            if(name != "undefined")
                message = message.replace("{" + index + "}", name)
            else message = message.replace("{" + index + "}", value)
        })
    }

    return message

}