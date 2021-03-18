const removeDp = document.getElementById('removeDp');
const update = document.getElementById('update');
const name = document.getElementById('name');
const email = document.getElementById('email');
const form = document.getElementById('form');
const file = document.getElementById('file');
let file1;

form.addEventListener('submit', (e) => {
    e.preventDefault();
})
update.addEventListener('click', async () => {
    if (name.value == '' || email.value == '') {
        alert('Can not Update For Empty Fields');
    } else {
        const updatedUser = await axios.put(`${window.location.origin}/api/v1/user/update`, {
            name: name.value,
            email: email.value,
            updatedAt: Date.now()
        }, {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
        location.href = `/profile?id=${updatedUser.data.data._id}`
    }
})

const changeDp = async (file) => {
    file1 = file.files[0];
}

async function updateDp() {
    var bodyFormData = new FormData();
    bodyFormData.append('profile', file1);
    const updatedDp = await axios.put(`${window.location.origin}/api/v1/user/update`, bodyFormData, {
        headers: {
            Authorization: localStorage.getItem('Authorization')
        }
    })
    const id = updatedDp.data.data._id;
    location.href = `/profile?id=${id}`
}

removeDp.addEventListener('click', async () => {
    const token = localStorage.getItem('Authorization');
    const ree = await axios.delete(`${window.location.origin}/api/v1/user/remove-dp`,
        {
            headers: {
                Authorization: token
            }
        });
    const id = ree.data._id;
    location.href = `/profile?id=${id}`
})
