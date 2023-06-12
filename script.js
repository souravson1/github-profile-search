const main = document.getElementById('main');
const searchBox = document.getElementById('search')

const getUser = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    const card = `
    <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Profile">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                    
                </div>
            </div>
        </div>`
        main.innerHTML = card;
        getRepos(username);
}

getUser("souravson1");

const getRepos = async (username) => {
    const repos = document.getElementById('repos')
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    data.forEach(
        (item)=>{
            const element = document.createElement('a');
            element.classList.add('repo')
            element.href = item.html_url;
            element.target = "_blank"
            element.innerText = item.name;
            repos.appendChild(element)
        }
    )

    
}
const formSubmit = () =>{
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
} 

searchBox.addEventListener('focusout', ()=>{
    formSubmit();
})