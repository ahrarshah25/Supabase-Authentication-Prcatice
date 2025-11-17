console.log("JS Connected - Profile + Image Upload!");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://pjzlrbjacxetuptntdfn.supabase.co";
const supabaseKey = "YOUR_PUBLIC_ANON_KEY_HERE";  // ⚠️ only anon key
const supabase = createClient(supabaseUrl, supabaseKey);


// ------------------------------------------
// 📌 GET USER PROFILE (Normal + Google Both)
// ------------------------------------------
async function getUserProfile() {

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userBio = document.getElementById("userBio");
    const profilePic = document.getElementById("profilePic");

    const { data: loginData, error } = await supabase.auth.getUser();

    if (error || !loginData?.user) {
        console.log("User fetch error:", error);
        return;
    }

    const user = loginData.user;

    // ----- Normal signup metadata -----
    const username_normal = user.user_metadata.username;
    const bio_normal = user.user_metadata.bio;
    const img_normal = user.user_metadata.profileImage;

    // ----- Google login metadata -----
    const username_google = user.user_metadata.full_name || user.user_metadata.name;
    const img_google = user.user_metadata.avatar_url;

    // ----- Final values (fallback system) -----
    const finalUsername = username_normal || username_google || "Unknown User";
    const finalBio = bio_normal || "No bio available";
    const finalImage = img_normal || img_google || "default-avatar.png";
    const finalEmail = user.email;

    // Display on UI
    userName.textContent = finalUsername;
    userEmail.textContent = finalEmail;
    userBio.textContent = finalBio;
    profilePic.src = finalImage;
}

getUserProfile();


// ------------------------------------------
// 📌 UPLOAD PROFILE IMAGE (works for both)
// ------------------------------------------
async function uploadImage() {

    const fileInput = document.getElementById("userImage");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const filePath = "profilePics/" + Date.now() + "-" + file.name;

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
        .from("user_media")
        .upload(filePath, file);

    if (error) {
        alert("Upload error: " + error.message);
        return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from("user_media")
        .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // Update user metadata (normal + google)
    const { error: updateError } = await supabase.auth.updateUser({
        data: {
            profileImage: imageUrl,  // normal users
            avatar_url: imageUrl     // google users
        }
    });

    if (updateError) {
        alert("Metadata update error: " + updateError.message);
        return;
    }

    alert("Image Uploaded!");

    // Update image on the page
    document.getElementById("profilePic").src = imageUrl;
}

window.uploadImage = uploadImage;
