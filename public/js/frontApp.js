const formData = document.getElementById('main');
const search = document.getElementById('location');
const msg_1 = document.getElementById('msg-1');
const msg_2 = document.getElementById('msg-2');

formData.addEventListener('submit', (e) => {
    e.preventDefault();
    msg_1.textContent = 'Loading.......';
    fetch(`http://localhost:4000/weather?address=${search.value}`).then((response)=> response.json().then((data)=> {
        if (data.error) {
            msg_1.textContent = data.error;
            msg_2.textContent = '';
        } else {
            msg_1.textContent = data.location;
            msg_2.textContent = data.forecast;
        }
    }));
})