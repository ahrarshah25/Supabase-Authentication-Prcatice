console.log("JS Connected - Signup Page Via Supabase!");

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pjzlrbjacxetuptntdfn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqemxyYmphY3hldHVwdG50ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODYzODUsImV4cCI6MjA3ODg2MjM4NX0.n60koN_CiNOlXHknw-b8rbxb090-vz56wQEihQKc-Ps';
const supabase = createClient(supabaseUrl, supabaseKey);

async function userSignup(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    const userConfirmPassword = document.getElementById("userConfirmPassword").value;
    const userBio = document.getElementById("userBio").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
        alert("Please fill in all fields!");
        return;
    }

    if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address!\nFor Example: name@domain.com");
        return;
    }

    if (userPassword !== userConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (userPassword.length < 6) {
        alert("Password should be at least 6 characters long!");
        return;
    }

    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
            emailRedirectTo: window.location.origin + "/index.html"
        }
    });

    if (signupError) {
        alert("Signup Error: " + signupError.message);
        return;
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
    });

    if (signInError) {
        alert("Login Error: " + signInError.message);
        return;
    }

    const userId = signInData.user.id;

    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert([
            {
                user_id: userId,
                username: userName,
                email: userEmail,
                bio: userBio
            }
        ]);

    if (profileError) {
        console.log("Profile Insert Error:", profileError.message);
        alert("Error creating profile: " + profileError.message);
        return;
    }

    alert("Signup successful! Redirecting to your profile...");
    window.location.href = "index.html";
}

window.userSignup = userSignup;