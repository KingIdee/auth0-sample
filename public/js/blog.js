getCategories();
getPosts();

$("#createpost").on('submit', function (e) {
    e.preventDefault();
    axios.post($("#createpost").attr('action'), $("#createpost").serialize())
        .then(res => {
            console.log(res.data);
            document.getElementById("createpost").reset();
            getPosts();
        })
        .catch(err => {
            console.log(err);
        })
});

 var token = localStorage.getItem('ACCESS_TOKEN_KEY')

var config = {
    headers: {'Authorization': `Bearer ${token}`}
  };

  console.log(`Bearer ${token}`);

function getCategories() {
    axios.get('/api/v1/categories',config)
        .then(res => {
            let options = res.data.data;
            let cleanData = "";
            for (let i in options) {
                cleanData += `<option value="${options[i]}">${options[i]}</option>`;
            }
            document.getElementById('category').innerHTML = cleanData;
        })
        .catch(err => {
            console.log(err);
        })
}

function getPosts() {
    axios.get('/api/v1/posts',config)
        .then(res => {
            let posts = res.data.data;
            let cleanData = "";
            for (let i in posts) {
                cleanData += `
                <div class="col-md-4">
                    <a href="/blog/${posts[i].id}" class="card link"  style="margin-bottom: 10px; height: 200px; ">
                        <div class="label label-default text-right" style="align-self: flex-end; width: 100px; margin-top: 5px">${posts[i].category}</div>
                        <h3>${posts[i].title}</h3>
                        <p class="text-left">${posts[i].post.substr(0, 200)}</p>
                    </a>
                </div>
                `;
            }
            document.getElementById('posts').innerHTML = cleanData;
        })
        .catch(err => {
            console.log(err);
        })
}

function getSinglePost(id) {
    axios.get('/api/v1/post/' + id, config)
        .then(res => {
            console.log(res.data);
            let cleanData = `
            <div style="background-color: white; padding: 15px;">
            <h3>${res.data.title}</h3>
            <hr>
            <p>${res.data.post}</p>
        </div>
            `;
            document.getElementById('single-post').innerHTML = cleanData;
        })
        .catch(err => {
            console.log(err);
        })
}
