const name1 = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const file = document.getElementById('file');
const form = document.getElementById('form');
let file1;

form.addEventListener('submit', (e) => {
    e.preventDefault();
})
const btn = document.getElementById('btn');

const fileUpload = (file) => {
    file1 = file.files[0];
    console.log(file1);
}


btn.addEventListener('click', async () => {
    var bodyFormData = new FormData();
    console.log(bodyFormData);
    bodyFormData.append('name', name1.value);
    bodyFormData.append('email', email.value);
    bodyFormData.append('password', password.value);
    if (file1) {
        if (file1.type == 'image/png' || file1.type == 'image/jpeg') {
            bodyFormData.append('profile', file1);
        } else {
            bodyFormData = '';
            file1 = '';
            file.value = '';
            alert('Invalid File Format, Upload Image!');
        }
    }
    console.log(bodyFormData);
    const data = await axios.post(`${window.location.origin}/api/v1/user/register`, bodyFormData)
    console.log(data);
    if (data.data.status == 'success') {
        alert('Registered Successfully');
        location.href = '/login'
    } else if (data.data.status == 'fail') {
        alert('This Email is alreday Registered, Try to Login');
    }
})
