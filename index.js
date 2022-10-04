document.getElementById('toPostContent').addEventListener('submit',submitPost);

function submitPost(e){
    e.preventDefault();

    const postData = {
        username: "User1",
        icon: './img/userlcon/defaultUser.png',
        ID: 0,
        time: new Date().toLocaleTimeString('en-GB'),
        date: new Date().toLocaleDateString('en-GB'),
        title: e.target.postTitle.value,
        content: e.target.postContent.value,
        // emoji: e.target.
        // gif: e.target.
        // commentCount: e.target.
        // dopeCount: e.target.
    }
    

    console.log(e.target.emoji.value);
    // console.log(postData);

    // appendPost(postData);
    
}









// todo Example appending post
/* <div class="row mb-2 px-4">
    <div class="container-fluid postPreview">
        <div class="row">
            <div class="col-2 py-2 d-flex justify-content-center">
                <div class="card">
                    <img src="./img/userlcon/defaultUser.png" class="card-img-top" alt="Default User Icon">
                    <div class="card-body p-1 border-top">
                        <p class="card-title m-0">User1</p>
                    </div>
                </div>
            </div>
            <div class="col py-2">
                <h5>Happy Day!</h5>
                <p>Today, I ...<br>...</p>
            </div>
            <div class="col-2 mt-2 d-flex justify-content-end">
                <a role="button" class="btn btn-secondary" href="./post.html" style="height:3em;">View</a>
            </div>
        </div>
        <div class="row pb-2">
            <div class="col-2 d-flex justify-content-center">
                <button class="btn btn-sm btn-outline-danger">DOPE</button>
            </div>
            <div class="col ms-2 reactionCount d-flex justify-content-start">comment x DOPE y</div>
            <div class="col d-flex justify-content-end">
                <span>14:21 03/Oct/2022</span>
            </div>
            <div class="col-1 d-flex justify-content-end">
                <span>id</span>
            </div>
        </div>
    </div>
</div> */
