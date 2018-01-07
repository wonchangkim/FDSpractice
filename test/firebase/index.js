// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjFpwCLg54dYw-01mi8ofqvl3-KJ4mXzU",
    authDomain: "fir-test-8a450.firebaseapp.com",
    databaseURL: "https://fir-test-8a450.firebaseio.com",
    projectId: "fir-test-8a450",
    storageBucket: "fir-test-8a450.appspot.com",
    messagingSenderId: "755785457330"
};

firebase.initializeApp(config);



var provider = new firebase.auth.GithubAuthProvider();
document.querySelector('.login').addEventListener('click', async e => {
    const result = await firebase.auth().signInWithPopup(provider);
    //끝나면 로그인 된상태


    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    document.querySelector('.profile-img').src = user.photoURL;
    document.querySelector('.display-name').textContent = user.displayName;
    document.querySelector('.email').textContent = user.email;

    console.log(token);
    document.querySelector('.warp').classList.add('none');
    // https://api.github.com/user/repos?access_token=OAUTH-TOKEN
    const res = await fetch(`https://api.github.com/user/repos?access_token=${token}`);
    const repos = await res.json() //텍스트를 객체로 반환
    console.log(repos);

    repos.forEach(repo => {
        let repoEl = document.createElement('li');
        let linkEl = document.createElement('a');
        document.querySelector('.repo-list').appendChild(repoEl);
        document.querySelector('li').appendChild(linkEl);
        repoEl.appendChild(linkEl);
        linkEl.textContent = repo.full_name;
        linkEl.href = repo.html_url;
    });
    firebase.database().ref('todos').on('value', snapshot => {
        console.log(snapshot.val());
    })
})

document.querySelector('.new-todo').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        //입력 필드에 들어있는 값을 파이어베이스에 전송
        firebase.database().ref('todos').push({
            //promise 리턴한다.
            content: e.currentTarget.value
        })
        e.currentTarget.value = '';
        //입력 필드를 비워주기
    }
})