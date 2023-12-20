import { createToast } from '../toast/script.js'
import { supabase } from './supa.js'

const getImage = async () => {
    const {data, error} = await supabase
    .from('users')
    .select('profilepic')
    .match({email: email})
    
    localStorage.setItem("imageurl", data[0]['profilepic'])
    if(!error)document.getElementById("profilepic").src=localStorage.getItem("imageurl");
    if(error) console.log(error);
}

let name, email;
const onloading = async () => {
    name = localStorage.getItem("username");
    document.getElementById("playername").innerHTML = name;
    email = localStorage.getItem("email");
    document.getElementById("playeremail").innerHTML = email;
    document.getElementById("playeremail").href = `mailto:${email}`;
    getImage();
    
    // leaderboard = localStorage.getItem("leaderboard");
    // document.getElementById("leaderboard").innerHTML = leaderboard;
    // progress = localStorage.getItem("progress");
};

const uploadImage = async (e) => {
    var fileInput = document.getElementById('newimgfile');
    var file = fileInput.files[0];
    let email = localStorage.getItem("email");
    e.preventDefault();
    if (file) {
        var formData = new FormData();
        formData.append('file', file);
        try {
            // Upload the file to Supabase Storage
            const { error } = await supabase.storage
                .from('Profile')
                .upload(email, formData, {
                    cacheControl: '3600',
                    upsert: true,
                });
                // console.log(data)
            if (error) {
                console.error('Error uploading image:', error);
            } else {
                // console.log('Image uploaded successfully:', data);
                const { error1 } = await supabase
                .from('users')
                .update({profilepic: `https://zknxbvmxrrhrrybszbny.supabase.co/storage/v1/object/public/Profile/${email}`})
                .match({email: email})
                console.log(error1)
                createToast("success", "Image Uploaded");
                document.getElementById("extracontainer3").classList.remove("open");
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
            createToast("error", "Error uploading image")
        }
    } else {
        createToast("warning", "No file selected")
    }
}

onloading();
document.getElementById("uploadnewpic").addEventListener("click", () => {
    document.getElementById("extracontainer3").classList.add("open");
})
document.getElementById("uploadimage").addEventListener("click", uploadImage);

document.getElementById("exit").addEventListener("click", () => {
    window.localStorage.clear();
    window.location.replace("../html/login.html");
})