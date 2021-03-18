const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');
const noPass = document.getElementById('noPass');
const noEmail = document.getElementById('noEmail');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

submitBtn.addEventListener('click', async () => {
    const res = await axios.put('http://localhost:3000/api/v1/user/login', {
        email: email.value,
        password: password.value
    });
    console.log(res);
    if (res.data.status == 'success') {
        localStorage.setItem('Authorization', res.data.user.userToken);
        alert(`${res.data.message}`);
        location.href = `/gallery?user=${res.data.user._id}&type=img`;
    } else if (res.data.status == 'Not Found') {
        noEmail.textContent = 'No user Found !';
        noPass.textContent = '';
        noEmail.style.color = 'red';
    } else {
        noPass.textContent = 'Incorrect Password !';
        noEmail.textContent = '';
        noPass.style.color = 'red';
    }

})

