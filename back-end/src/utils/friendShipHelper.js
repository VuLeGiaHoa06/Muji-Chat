// nếu userA mà ký tự có giá trị lớn hơn userB - thì B là phần tử đầu tiên
export const pair = (a, b) => (a > b ? [b, a] : [a, b]);
