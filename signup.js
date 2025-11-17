console.log("JS Connected - Signup Page Via Supabase!");

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pjzlrbjacxetuptntdfn.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY_ONLY'; // NEVER USE service role key !!!
const supabase = createClient(supabaseUrl, supabaseKey);


// NORMAL SIGNUP FUNCTION
async function userSignup(event) {
    event.preventDefault();

    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    let userConfirmPassword = document.getElementById("userConfirmPassword").value;
    let userBio = document.getElementById("userBio").value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName || !userEmail || !userPassword || !userConfirmPassword || !userBio) {
        alert("Please fill in all fields!");
        return;
    }
    if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address!");
        return;
    }
    if (userPassword !== userConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
            data: {
                username: userName,
                bio: userBio
            }
        }
    });

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Signup successful! Check your email for verification.");
    }
}


// GOOGLE LOGIN FUNCTION
async function googleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin
        }
    });

    if (error) {
        alert("Google Login Error: " + error.message);
    } else {
        console.log("Google Login Started:", data);
    }
}


// expose to HTML
window.userSignup = userSignup;
window.googleLogin = googleLogin;
