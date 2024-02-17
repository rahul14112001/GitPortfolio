const APIURL = "https://api.github.com/users/";  //// this is  api url by which github data can be fetched
const main=document.querySelector("#main");

//// fetch user data from the api
const getUser=async(username)=>{
    const response=await fetch(APIURL + username);
    // console.log(response);
    const data=await response.json()
    if (response.status === 404 || data.message === "Not Found") { /// if the username is not valid
        exit();
        return; // Exit the function early
    }
    // console.log(data)
    const card=`
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop"> 
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
        </div>
        
    `

    main.innerHTML=card; 
    getRepos(username);/// call function to get repository of the user
}

/// initial call
// getUser("taylorotwell")


/// use to get all the repository made by the user
const getRepos=async(username)=>{
    const repos=document.querySelector("#repos");
    const response=await fetch(APIURL + username + "/repos");
    const data=await response.json();
    data.forEach((item) => {
        // console.log(item);
        const ele=document.createElement("a"); /// create anchor tag
        ele.classList.add("repo");
        ele.href=item.html_url; ////store url of repository
        ele.innerText=item.name;
        ele.target="_blank"; // on click it will be opened in new tab
        repos.appendChild(ele);
    });

}

const searchBox=document.querySelector("#search");
const formSubmit=()=>{
    if(searchBox.value!=""){
        getUser(searchBox.value);
        searchBox.value=""; ///after searching , search box will be empty
    }
    return false; //  on submit , page will not refresh
}

searchBox.addEventListener("focusout",
    function(){
        formSubmit(); 
    }
)

////if user not exist then this function will be called
const exit=()=>{
    // console.log("exit");
    main.innerHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="../image/search.jpg" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>User Not Found</h2>
            </div>
        </div>
    `;
}

/*
    <a class="repo" href="#" target="_blank">Repo 1</a>
    <a class="repo" href="#" target="_blank">Repo 2</a>
    <a class="repo" href="#" target="_blank">Repo 3</a>
*/