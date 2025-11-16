console.log("JS Connected - Login Page Via Supabase!");


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pjzlrbjacxetuptntdfn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqemxyYmphY3hldHVwdG50ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODYzODUsImV4cCI6MjA3ODg2MjM4NX0.n60koN_CiNOlXHknw-b8rbxb090-vz56wQEihQKc-Ps';
const supabase = createClient(supabaseUrl, supabaseKey);

var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");

async function userLogin(event) {
    event.preventDefault();
    var email = userEmail.value;
    var password = userPassword.value;
    if(!email || !password){
        alert("Please fill in all fields!");
        return;
    }

    const { data: LoginData, error: LoginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (LoginError) {
        console.log("Login Error:", LoginError.message);
        alert("Error during login: " + LoginError.message);
    } else {
        console.log("Login Successful:", LoginData);
        alert("Login successful! Welcome back.");
        window.location.href = "index.html";
    }
};

window.userLogin = userLogin;